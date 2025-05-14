from flask import Blueprint, request, jsonify
from models.models import db
from sqlalchemy import or_
import os
import logging
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

message_api_bp = Blueprint('message_api', __name__)

@message_api_bp.route('/api/messages/history/<booking_id>', methods=['GET'])
def get_chat_history(booking_id):
    """
        Retrieve all the chat history based on booking_id table
    """
    try:
        fetch_chat_history = f"""
            SELECT m.ID, m.User_Rider_ID, u.name, m.Messages, m.TimeStamp
            FROM todanav_messages.{booking_id} AS m
            JOIN todanav_db.user AS u 
            ON u.user_id COLLATE utf8mb4_general_ci = m.User_Rider_ID COLLATE utf8mb4_general_ci 
        """
        
        with db.engine.connect() as conn:
            result = conn.execute(text(fetch_chat_history)).mappings().fetchall()
            
            # Convert the result into list of dicts
            chat_history = [] 
            for row in result:
                chat_history.append({
                    'id': row['ID'],
                    'user_rider_id': row['User_Rider_ID'],
                    'name': row['name'],
                    'messages': row['Messages'],
                    'timestamp': row['TimeStamp'].strftime('%Y-%m-%dT%H:%M:%S')
                })
                
        return jsonify(chat_history), 200      
            
    except Exception as e:
        logger.error(f"Error fetching chat history: {e}")
        return jsonify({'error': str(e)}), 500
    

@message_api_bp.route('/api/messages/conversations/<user_id>', methods=['GET'])
def get_conversations(user_id):
    """
        Return the list of messages from tables (booking_{Booking_id}) found in todanav_messages
        but only if the given user_id exists in that table.
    """
    try:
        # Retrieves all the table and store it to conversations first
        fetch_all_booking_tables = "SHOW TABLES FROM todanav_messages"
        booking_tables = []
        
        with db.engine.connect() as conn:
            result = conn.execute(text(fetch_all_booking_tables))
            booking_tables = [row[0] for row in result.fetchall() if row[0].startswith('booking_')]
        
        conversations = []
        
        for table in booking_tables:
            # Check if user_id exists in this booking_table (messages)
            check_user_query = f"""
                SELECT 1
                FROM todanav_messages.{table}
                WHERE User_Rider_ID = :user_id
                LIMIT 1
            """
            
            with db.engine.connect() as conn:
                user_exists_in_table = conn.execute(text(check_user_query), {'user_id': user_id}).fetchone()
                
                if not user_exists_in_table:
                    # Skip this table if user_id not found
                    continue  
            
            # If user exists in table, fetch the first conversation and other details (based on MIN Timestamp)
            fetch_conversation = f"""
                SELECT b.Booking_ID, b.User_Rider_ID, b.Messages, b.Timestamp, u.name
                FROM todanav_messages.{table} AS b
                JOIN todanav_db.user AS u ON u.user_id COLLATE utf8mb4_general_ci = b.User_Rider_ID COLLATE utf8mb4_general_ci
                WHERE b.Timestamp = (
                    SELECT MIN(Timestamp) FROM todanav_messages.{table}
                )
                LIMIT 1
            """

            with db.engine.connect() as conn:
                result = conn.execute(text(fetch_conversation))
                row = result.mappings().fetchone()
                
                if row:
                    conversations.append({
                        'Booking_ID': row['Booking_ID'],
                        'User_Rider_ID': row['User_Rider_ID'],
                        'name': row['name'],
                        'First_Message': row['Messages'],
                        'Timestamp': row['Timestamp'].strftime('%Y-%m-%dT%H:%M:%S')
                    })

        logger.info(f"Successfully fetched conversations for user_id={user_id}")
        logger.info(f"rows: {conversations}")

        return jsonify(conversations), 200
    except Exception as e:
        logger.error(f"Error fetching conversation: {e}")
        return jsonify({'error': str(e)}), 500
