from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

try:
    from config.config import config
except ImportError:
    config = {
        "MYSQL_USER": "root",
        "MYSQL_PASSWORD": "",
        "MYSQL_HOST": "localhost",
        "MYSQL_DB": "todanav_db",
    }

if not isinstance(config, dict):
    raise TypeError("The 'config' variable must be a dictionary.")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+mysqlconnector://{config['MYSQL_USER']}:{config['MYSQL_PASSWORD']}@{config['MYSQL_HOST']}/{config['MYSQL_DB']}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app, supports_credentials=True)
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'Missing fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 409

    hashed_pw = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'name': user.name, 'email': user.email}})
    return jsonify({'error': 'Invalid email or password'}), 401

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)