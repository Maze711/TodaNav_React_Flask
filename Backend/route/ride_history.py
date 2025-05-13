from flask import Blueprint, jsonify, request
from models.models import db, TripHistory
from datetime import datetime

ride_history_bp = Blueprint('ride_history', __name__)

@ride_history_bp.route('/api/ride_history/<user_id>', methods=['GET'])
def get_ride_history(user_id):
    try:
        # Query trip history for the given user_id
        trips = TripHistory.query.filter_by(user_id=user_id).all()
        if not trips:
            return jsonify({'message': 'No ride history found for this user'}), 404

        # Serialize the trip data
        trip_list = []
        for trip in trips:
            trip_list.append({
                'id': trip.id,
                'user_id': trip.user_id,
                'rider_id': trip.rider_id,
                'booking_id': trip.booking_id,
                'start_time': trip.start_time.isoformat(),
                'end_time': trip.end_time.isoformat(),
                'date': trip.date.isoformat(),
                'location_from': trip.location_from,
                'location_to': trip.location_to
            })

        return jsonify({'ride_history': trip_list}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ride_history_bp.route('/api/ride_history', methods=['POST'])
def add_ride_history():
    try:
        data = request.get_json()
        required_fields = ['user_id', 'rider_id', 'booking_id', 'start_time', 'end_time', 'date', 'location_from', 'location_to']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Replace 'Z' with '+00:00' to handle UTC ISO format
        def parse_iso(dt_str):
            if dt_str.endswith('Z'):
                dt_str = dt_str[:-1] + '+00:00'
            return datetime.fromisoformat(dt_str)

        # Parse datetime and date fields
        start_time = parse_iso(data['start_time'])
        end_time = parse_iso(data['end_time'])
        date = parse_iso(data['date']).date()

        new_trip = TripHistory(
            user_id=data['user_id'],
            rider_id=data['rider_id'],
            booking_id=data['booking_id'],
            start_time=start_time,
            end_time=end_time,
            date=date,
            location_from=data['location_from'],
            location_to=data['location_to']
        )
        db.session.add(new_trip)
        db.session.commit()

        return jsonify({'message': 'Ride history added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
