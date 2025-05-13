# TodaNav Project

This repository contains the frontend and backend for the TodaNav project, a modern tricycle booking and management system for Muntinlupa City.

---

## Frontend

The frontend is a React-based web application built with Vite. It provides a user-friendly interface for booking tricycle rides, managing notifications, and viewing routes on interactive maps.

### Technologies & Libraries Used

- **React 19.1.0:** Core UI library for building user interfaces.
- **Vite 6.3.5:** Fast frontend build tool and development server.
- **MDB React UI Kit:** Material Design Bootstrap components for React.
- **React Leaflet & Leaflet:** For rendering interactive maps and routing.
- **Bootstrap 5:** Responsive CSS framework.
- **React Router:** Client-side routing.
- **React Hot Toast:** For toast notifications.
- **Axios:** HTTP client for API requests.
- **FontAwesome:** Icon library.
- **Recharts:** Charting library for data visualization.
- **Socket.io-client:** Real-time communication with backend.

For a complete list of dependencies, see the [`package.json`](Frontend/package.json) file.

### Prerequisites

- **Node.js:** Version 18 or newer is recommended. Download from [https://nodejs.org/](https://nodejs.org/).
- **npm or yarn:** Package managers for Node.js.

### Installation & Running the Frontend

1. **Clone the repository and navigate to the frontend directory:**
   ```sh
   git clone https://github.com/yourusername/TodaNav_React_Flask.git
   cd TodaNav_React_Flask/Frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Access the app:**
   Open your browser and go to [http://localhost:5173](http://localhost:5173).

---

## Backend

The backend is a Flask API server that handles user authentication, booking management, notifications, and real-time messaging via WebSocket.

### Technologies & Libraries Used

- **Python 3.8 or newer:** Recommended for compatibility with Flask 3.x.
- **Flask 3.1.0:** Web framework for building the API.
- **Flask-CORS:** Handling Cross-Origin Resource Sharing.
- **Flask-Login:** User session management.
- **Flask-SocketIO & Eventlet:** Real-time WebSocket communication.
- **Flask-SQLAlchemy & SQLAlchemy:** ORM for database interactions.
- **MySQL Connector:** For connecting to MySQL databases.
- Other dependencies as listed in [`Backend/requirements.txt`](Backend/requirements.txt).

### Prerequisites

- **Python 3.8+**: Download from [https://www.python.org/downloads/](https://www.python.org/downloads/).
- **XAMPP:** Provides MySQL server. Recommended version: 8.2.x or latest stable. Download from [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html).
- **Virtual Environment:** Recommended to isolate Python dependencies.

### Database Setup

1. **Install and start XAMPP:**
   - Launch XAMPP Control Panel.
   - Start the **MySQL** service.

2. **Create the databases:**
   - Use phpMyAdmin (accessible via XAMPP at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)) or MySQL CLI.
   - Import the database schema from `Database SQL/todanav_db.sql` to create necessary tables and initial data.

3. **Configure database credentials:**
   - Edit `Backend/config/config.py` to set your MySQL username, password, host, and database names.
   - Default configuration is:
     ```python
     MYSQL_USER = "root"
     MYSQL_PASSWORD = ""
     MYSQL_HOST = "localhost"
     MYSQL_DB = "todanav_db"
     MYSQL_MESSAGES_DB = "todanav_messages"
     ```

### Installation & Running the Backend

1. **Clone the repository and navigate to the backend directory:**
   ```sh
   git clone https://github.com/yourusername/TodaNav_React_Flask.git
   cd TodaNav_React_Flask/Backend
   ```

2. **Create and activate a Python virtual environment (recommended):**
   ```sh
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install backend dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Start the backend server:**
   ```sh
   python app.py
   ```

   The backend server will run at [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## Running Frontend and Backend Concurrently

To run both servers simultaneously from the `Frontend` directory, use:

```sh
npm run dev:all
```

This command starts the frontend development server and the backend Flask server concurrently for easier development.

---

## Project Structure Overview

```
TodaNav_React_Flask/
├── Frontend/
│   ├── public/                # Static assets
│   ├── src/                   # React source code
│   ├── package.json           # Frontend dependencies and scripts
│   └── vite.config.js         # Vite configuration
├── Backend/
│   ├── app.py                 # Flask application entry point
│   ├── requirements.txt       # Python dependencies
│   ├── config/                # Configuration files
│   ├── models/                # Database models
│   ├── route/                 # API route handlers
│   └── ...                   # Other backend files
├── Database SQL/
│   └── todanav_db.sql         # Database schema and initial data
└── README.md                  # This file
```

---

## Additional Notes

- Ensure the MySQL service in XAMPP is running before starting the backend.
- The backend uses WebSocket for real-time messaging features.
- The frontend communicates with the backend API at `http://localhost:5000`.
- Adjust ports in configuration files if needed to avoid conflicts.
- For any issues, check logs and console output for debugging information.

---

## Useful Commands Summary

| Command                      | Description                              | Location  |
|------------------------------|----------------------------------------|-----------|
| `npm install`                | Install frontend dependencies          | Frontend  |
| `npm run dev`                | Start frontend development server      | Frontend  |
| `python -m venv venv`        | Create Python virtual environment       | Backend   |
| `venv\Scripts\activate`      | Activate virtual environment (Windows) | Backend   |
| `source venv/bin/activate`   | Activate virtual environment (macOS/Linux) | Backend   |
| `pip install -r requirements.txt` | Install backend dependencies       | Backend   |
| `python app.py`              | Start backend Flask server              | Backend   |
| `npm run dev:all`            | Run frontend and backend concurrently   | Frontend  |

---

**TodaNav** — Modern Tricycle Booking for Muntinlupa City
