from flask import Blueprint, jsonify, request, Response
from models.models import db, User
from base64 import b64decode

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
        'role': user.role,
        'contact_no': user.contact_no,
    })

@user_bp.route('/api/user/profile_image/<user_id>', methods=['GET'])
def get_profile_image(user_id):
    """Fetch user profile image from database"""
    user = User.query.filter_by(user_id=user_id).first()
    
    if not user or not user.user_profile:
        return Response(status=404)
    
    # Return the binary image data with proper content type
    return Response(
        user.user_profile,
        mimetype='image/jpeg', 
        headers={
            'Content-Disposition': f'inline; filename=profile_{user_id}.jpg'
        }
    )
    
@user_bp.route('/api/user/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    # Get the user from the database
    user = User.query.filter_by(user_id=user_id).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Check if the request is multipart/form-data or application/json
    if request.content_type and request.content_type.startswith('multipart/form-data'):
        # Handle form data with file upload
        data = request.form
        
        # Update text fields
        if 'name' in data:
            user.name = data['name']
        if 'contact_no' in data:
            user.contact_no = data['contact_no']
        
        # Check if profile image was uploaded
        if 'profile_img' in request.files:
            file = request.files['profile_img']
            if file and file.filename:
                # Read the file data directly into the user_profile field
                user.user_profile = file.read()
    else:
        # Handle JSON data
        data = request.get_json()
        
        # Update text fields
        if data.get('name'):
            user.name = data['name']
        if 'contact_no' in data:
            user.contact_no = data['contact_no']
        
        # Check if profile image was included as base64
        if data.get('profile_img') and isinstance(data['profile_img'], str):
            try:
                # Split off the data URI prefix (e.g., "data:image/jpeg;base64,")
                if ',' in data['profile_img']:
                    user.user_profile = b64decode(data['profile_img'].split(',')[1])
                else:
                    user.user_profile = b64decode(data['profile_img'])
            except Exception as e:
                print(f"Error decoding base64 image: {e}")
    
    try:
        db.session.commit()
        return jsonify({
            'name': user.name, 
            'contact_no': user.contact_no, 
            'message': 'Profile updated successfully!'
        }), 200
    except Exception as e:
        db.session.rollback()
        print(f"Database error: {e}")
        return jsonify({'error': f'Failed to update user: {str(e)}'}), 500