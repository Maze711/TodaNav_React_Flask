from flask import Blueprint, jsonify, request
from models.models import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/user/by_userid/<user_id>', methods=['GET'])
def get_user_by_userid(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'id': user.id,
        'user_id': user.user_id,
        'name': user.name,
        'email': user.email,
        'role': user.role 
    })