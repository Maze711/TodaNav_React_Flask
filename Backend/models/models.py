from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash
from datetime import datetime, date

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(20), unique=True, nullable=False)  # New field
    name = db.Column(db.String(150), nullable=False)
    contact_no = db.Column(db.String(225), nullable=True)  # Add contact_no field
    user_profile = db.Column(db.LargeBinary, nullable=True)  # Add user_profile field
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="USER")  # Add role field

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class TripHistory(db.Model):
    __tablename__ = 'trip_history'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(255), nullable=False)
    rider_id = db.Column(db.String(255), nullable=False)
    booking_id = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.Date, nullable=False)
    location_from = db.Column(db.String(255), nullable=False)
    location_to = db.Column(db.String(255), nullable=False)
