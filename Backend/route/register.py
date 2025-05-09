from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.models import db, User
from datetime import datetime

register_bp = Blueprint('register', __name__)

@register_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Missing fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    # Generate user_id in format YYYY_NNNN
    year = datetime.now().year
    count = User.query.filter(User.user_id.like(f"{year}_%")).count() + 1
    user_id = f"{year}_{count:04d}"

    hashed_pw = generate_password_hash(password)
    user = User(user_id=user_id, name=name, email=email, password_hash=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201