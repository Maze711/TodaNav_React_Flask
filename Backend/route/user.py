from flask import Blueprint, jsonify, request
from models.models import db, User

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
        'role': user.role ,
        'contact_no': user.contact_no,
    })
    
@user_bp.route('/api/user/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    # User Details from client side
    data = request.get_json()
    updated_name = data.get('name')
    updated_contact = data.get('contact_no')
    # updated_profile = data.get('user_profile')
    
    user = User.query.filter_by(user_id=user_id).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Update the user details
    user.name = updated_name
    user.contact_no = updated_contact
    # user.user_profile = updated_profile
    
    try:
        # Commit the changes to the database
        db.session.commit()
        return jsonify({
            'name': user.name, 
            'contact_no': user.contact_no, 
            'message': 'Profile updated successfully!'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update user'}), 500