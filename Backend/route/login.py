from flask import Blueprint, request, jsonify
from models.models import User

login_bp = Blueprint('login', __name__)

@login_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'role': user.role  # Include role in response
            }
        })
    return jsonify({'error': 'Invalid email or password'}), 401