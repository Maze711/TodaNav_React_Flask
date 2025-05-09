from flask import Blueprint, jsonify, request
from models.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email
        # Add more fields if needed
    })