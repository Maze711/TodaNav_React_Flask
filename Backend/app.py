from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import db 

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
db.init_app(app)

# Register blueprints
from route.register import register_bp
from route.login import login_bp

app.register_blueprint(register_bp)
app.register_blueprint(login_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)