import logging
import os
from flask import Blueprint, request
from flask_socketio import emit, join_room
from config.socketio_config import socketio
from models.models import db, Message
from datetime import datetime
from sqlalchemy import text

# Set up the logger
log_file_path = os.path.join(os.path.dirname(__file__), "socketio.log")  # Log file in the same directory as this script
logging.basicConfig(
    level=logging.DEBUG,  # Change to DEBUG to capture more detailed logs
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_file_path),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

message_ws_bp = Blueprint('message_ws', __name__)

connected_users = {}  # Dictionary to track connected users and their roles

@socketio.on('connect')
def handle_connect():
    role = request.args.get('role')
    user_id = request.sid
    connected_users[user_id] = role
    logger.info(f"User connected: {user_id}, Role: {role}")

    if role and role.lower() == 'rider':  # Case-insensitive check
        join_room('riders')
        logger.info(f"Rider {user_id} joined room: riders")

@socketio.on('disconnect')
def handle_disconnect():
    """
    Handle client disconnection and remove them from tracking.
    """
    user_id = request.sid
    role = connected_users.pop(user_id, None)
    logger.info(f"User disconnected: {user_id}, Role: {role}")  # Log disconnections

@socketio.on('message')
def handle_message(data):
    logger.info(f"Message received: {data}")

    # Save message to database
    try:
        sender_id = data.get('user_id') or data.get('sender_id') or ''
        receiver_id = data.get('rider_id') if data.get('rider_id') is not None else data.get('receiver_id')
        booking_id = data.get('booking_id') or ''
        content = data.get('content') or ''
        timestamp = datetime.utcnow()

        # Fix: receiver_id cannot be None, set to empty string if None
        if receiver_id is None:
            receiver_id = ''

        if sender_id and booking_id and content:
            # Removed insertion into static Message table as per user request
            # Insert into dynamic booking_id table if exists
            table_name = f"`{booking_id}`"
            insert_sql = f"""
            INSERT INTO todanav_messages.{table_name} (User_Rider_ID, Messages, Timestamp, Booking_ID)
            VALUES (:user_rider_id, :messages, :timestamp, :booking_id)
            """
            try:
                with db.engine.connect() as conn:
                    trans = conn.begin()
                    # Insert only one ID: rider_id if exists, else user_id
                    user_rider_id = receiver_id if receiver_id else sender_id
                    result1 = conn.execute(
                        text(insert_sql),
                        {
                            "user_rider_id": user_rider_id,
                            "messages": content,
                            "timestamp": timestamp,
                            "booking_id": booking_id,
                        },
                    )
                    trans.commit()
                    logger.info(f"Message inserted into dynamic table {table_name}, rows affected: {result1.rowcount + (result2.rowcount if 'result2' in locals() else 0)}")
            except Exception as e:
                logger.error(f"Error inserting message into dynamic table {table_name}: {e}")
        else:
            logger.warning("Message missing required fields, not saved.")
    except Exception as e:
        logger.error(f"Error saving message to DB: {e}")
        db.session.rollback()

    # Emit message only to the room for the booking_id
    if booking_id:
        emit('message', data, room=booking_id)
    else:
        emit('message', data, broadcast=True)

@socketio.on('create_booking')
def handle_create_booking(data):
    """
    Notify riders about a new booking, create dynamic message table, and send confirmation back to the user.
    """
    booking_id = data.get('booking_id')
    user_id = data.get('user_id')
    from_location = data.get('from_location')
    to_location = data.get('to_location')

    # Log the received data
    logger.info(f"Received create_booking event with data: {data}")

    # Create table named after booking_id if not exists
    if booking_id:
        table_name = f"`{booking_id}`"
        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS todanav_messages.{table_name} (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            User_Rider_ID VARCHAR(100) NOT NULL,
            Account_ID VARCHAR(50),
            Messages TEXT NOT NULL,
            Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            Booking_ID VARCHAR(50) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """
        try:
            with db.engine.connect() as conn:
                conn.execute(text(create_table_sql))
                logger.info(f"Created table {table_name} in todanav_messages database.")
        except Exception as e:
            logger.error(f"Error creating table {table_name}: {e}")

    # Join the user to the booking room
    join_room(booking_id)
    logger.info(f"User {request.sid} joined room: {booking_id}")

    # Notify riders with booking details
    emit('new_booking', {
        'booking_id': booking_id,
        'user_id': user_id,
        'from_location': from_location,
        'to_location': to_location,
    }, room='riders')

    # Send confirmation back to the user who created the booking
    emit('booking_confirmation', {
        'booking_id': booking_id,
        'from_location': from_location,
        'to_location': to_location,
    }, to=request.sid)  # Send only to the user who created the booking

@socketio.on('accept_booking')
def handle_accept_booking(data):
    """
    Rider accepts a booking. Notify the booking creator.
    """
    booking_id = data.get('booking_id')
    rider_name = data.get('rider_name')
    user_id = data.get('user_id')

    logger.info(f"Booking accepted: {booking_id} by {rider_name} ({user_id})")

    # Join the rider to the booking room
    join_room(booking_id)
    logger.info(f"User {request.sid} joined room: {booking_id}")

    emit('booking_accepted', {
        'booking_id': booking_id,
        'rider_name': rider_name,
        'user_id': user_id,
    }, broadcast=True)

    # Emit event to update booking status to ride done in BookingDetail.jsx
    emit('booking_accepted_update', {
        'booking_id': booking_id,
    }, broadcast=True)

from sqlalchemy import text

@socketio.on('ride_done')
def handle_ride_done(data):
    """
    Rider marks ride as done. Notify the booking creator.
    Also create a new table named after booking_id to store messages.
    """
    booking_id = data.get('booking_id')
    user_id = data.get('user_id')

    logger.info(f"Ride done for booking: {booking_id} by user: {user_id}")

    # Create table named after booking_id if not exists
    if booking_id:
        table_name = f"`{booking_id}`"
        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS todanav_messages.{table_name} (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            User_Rider_ID VARCHAR(100) NOT NULL,
            Messages TEXT NOT NULL,
            Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            Booking_ID VARCHAR(50) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """
        try:
            with db.engine.connect() as conn:
                conn.execute(text(create_table_sql))
                logger.info(f"Created table {table_name} in todanav_messages database.")
        except Exception as e:
            logger.error(f"Error creating table {table_name}: {e}")

    emit('ride_done', {
        'booking_id': booking_id,
        'user_id': user_id,
    }, broadcast=True)

@socketio.on('join_room')
def handle_join_room(data):
    booking_id = data.get('booking_id')
    if booking_id:
        join_room(booking_id)
        logger.info(f"User {request.sid} joined room: {booking_id}")

@socketio.on('payment_received_signal')
def handle_payment_received_signal(data):
    booking_id = data.get('booking_id')
    user_id = data.get('user_id')
    logger.info(f"Payment received signal for booking: {booking_id} by user: {user_id}")
    if booking_id:
        # Emit event to the booking room to notify clients
        emit('payment_received_update', {
            'booking_id': booking_id,
            'user_id': user_id,
        }, room=booking_id)

@socketio.on('clear_booking_chat')
def handle_clear_booking_chat(data):
    booking_id = data.get('booking_id')
    logger.info(f"Clear booking chat signal for booking: {booking_id}")
    if booking_id:
        emit('clear_booking_chat', {'booking_id': booking_id}, room=booking_id)
