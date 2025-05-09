import logging
import os
from flask import Blueprint, request
from flask_socketio import emit, join_room
from config.socketio_config import socketio

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
    emit('message', data, broadcast=True)

@socketio.on('create_booking')
def handle_create_booking(data):
    """
    Notify riders about a new booking and send confirmation back to the user.
    """
    booking_id = data.get('booking_id')
    user_id = data.get('user_id')
    from_location = data.get('from_location')
    to_location = data.get('to_location')

    # Log the received data
    logger.info(f"Received create_booking event with data: {data}")

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