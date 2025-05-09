from flask import Blueprint, request
from flask_socketio import emit, send
from config.socketio_config import socketio

message_ws_bp = Blueprint('message_ws', __name__)

@socketio.on('message')
def handle_message(data):
    emit('message', data, broadcast=True)