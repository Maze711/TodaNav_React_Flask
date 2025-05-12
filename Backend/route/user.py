from flask import Blueprint, jsonify, request, Response
from models.models import db, User
from base64 import b64decode, b64encode

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
            'Content-Disposition': f'inline; filename=profile_{user_id}.jpg',
        }
    )

MAX_IMAGE_SIZE = 2 * 1024 * 1024  # 2MB

@user_bp.route('/api/user/update/<user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Handle JSON or multipart data
    if request.content_type.startswith('multipart/form-data'):
        data = request.form
        profile_file = request.files.get('profile_img')
    else:
        data = request.get_json() or {}
        profile_file = None

    # Update text fields
    user.name = data.get('name', user.name)
    user.contact_no = data.get('contact_no', user.contact_no)

    # Handle image from file upload
    if profile_file and profile_file.filename:
        if profile_file.content_length > MAX_IMAGE_SIZE:
            return jsonify({'error': 'Profile image exceeds 2MB limit'}), 400
        user.user_profile = profile_file.read()

    # Handle image from base64 (if JSON)
    elif isinstance(data.get('profile_img'), str):
        try:
            img_data = data['profile_img'].split(',')[-1]
            decoded_img = b64decode(img_data)
            if len(decoded_img) > MAX_IMAGE_SIZE:
                return jsonify({'error': 'Profile image exceeds 2MB limit'}), 400
            user.user_profile = decoded_img
        except Exception as e:
            print(f"Error decoding base64 image: {e}")
            return jsonify({'error': 'Invalid base64 image data'}), 400
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Database error: {e}")
        return jsonify({'error': f'Failed to update user: {str(e)}'}), 500

    # Return updated data with image as base64
    profile_image_base64 = None
    if user.user_profile:
        profile_image_base64 = f"data:image/jpeg;base64,{b64encode(user.user_profile).decode('utf-8')}"

    return jsonify({
        'name': user.name,
        'contact_no': user.contact_no,
        'user_profile': profile_image_base64,
        'message': 'Profile updated successfully!'
    }), 200
