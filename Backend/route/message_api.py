from flask import Blueprint, request, jsonify
from models.models import Message  # Corrected import path
from models.models import db
from sqlalchemy import or_

message_api_bp = Blueprint('message_api', __name__)

@message_api_bp.route('/api/messages', methods=['GET'])
def get_messages():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id query parameter is required'}), 400

    # Query messages where user is sender or receiver
    messages = Message.query.filter(
        or_(Message.sender_id == user_id, Message.receiver_id == user_id)
    ).order_by(Message.timestamp.desc()).all()

    messages_list = []
    for msg in messages:
        messages_list.append({
            'id': msg.id,
            'sender_id': msg.sender_id,
            'receiver_id': msg.receiver_id,
            'message_content': msg.content,
            'timestamp': msg.timestamp.isoformat()
        })

    return jsonify(messages_list)
