from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import db 
from config.socketio_config import socketio
from route.message_ws import message_ws_bp
from route.message_api import message_api_bp  # Added import for message_api
import eventlet
import eventlet.wsgi

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

CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})
db.init_app(app)

# Register blueprints
from route.register import register_bp
from route.login import login_bp
from route.user import user_bp

app.register_blueprint(register_bp)
app.register_blueprint(login_bp)
app.register_blueprint(user_bp)
app.register_blueprint(message_ws_bp)  # Existing websocket blueprint
app.register_blueprint(message_api_bp)  # Register the new message API blueprint

if __name__ == '__main__':

    with app.app_context():
        db.create_all()
    socketio.init_app(app, async_mode='eventlet')
    eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 5000)), app)
