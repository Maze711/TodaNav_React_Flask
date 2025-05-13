# TodaNav Project

This repository contains the frontend and backend for the TodaNav project, a modern tricycle booking and management system for Muntinlupa.

---

## Frontend

The frontend is a React-based web application built with Vite. It features a modern UI, dark mode support, interactive maps, and notification management.

### Tech Stack & Libraries

- React 19.1.0
- Vite 6.3.5
- MDB React UI Kit
- React Leaflet for maps
- Leaflet for map rendering
- Bootstrap 5
- React Router
- React Hot Toast for notifications
- Axios for API requests
- FontAwesome icons
- Recharts for charts
- Socket.io-client for real-time communication

See the `package.json` for the full list of dependencies.

### Prerequisites

- Node.js v18 or newer (recommended)
- npm or yarn

### Installation & Running

1. Clone the repository and navigate to the frontend folder:
   ```sh
   git clone https://github.com/yourusername/TodaNav_React_Flask.git
   cd TodaNav_React_Flask/Frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit [http://localhost:5173](http://localhost:5173).

---

## Backend

The backend is a Flask API server providing REST and WebSocket endpoints, connected to MySQL databases.

### Tech Stack & Requirements

- Python 3.8 or newer (recommended)
- Flask 3.1.0 and related libraries (see `Backend/requirements.txt`)
- MySQL database (via XAMPP)
- Eventlet for asynchronous server

### Prerequisites

- Python 3.8+
- XAMPP (latest stable version recommended, e.g., 8.2.x) for MySQL server
- Virtual environment for Python dependencies

### Installation & Running

1. Install XAMPP and start the MySQL service.

2. Clone the repository and navigate to the backend folder:
   ```sh
   git clone https://github.com/yourusername/TodaNav_React_Flask.git
   cd TodaNav_React_Flask/Backend
   ```

3. (Optional but recommended) Create and activate a Python virtual environment:
   ```sh
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

4. Install backend dependencies:
   ```sh
   pip install -r requirements.txt
   ```

5. Configure your MySQL database credentials in `Backend/config/config.py` or use the default config in `app.py`.

6. Start the backend server:
   ```sh
   python app.py
   ```

   The backend server will run on [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## Running Frontend and Backend Concurrently

From the `Frontend` directory, you can run both servers concurrently using:

```sh
npm run dev:all
```

This will start the frontend development server and the backend Flask server simultaneously.

---

## Database

The project uses MySQL databases for application data and messages. Use XAMPP to manage the MySQL server. The database schema is provided in the `Database SQL/todanav_db.sql` file.

---

## Project Structure

```
Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   ├── pages/
│   ├── ThemeContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js

Backend/
├── app.py
├── requirements.txt
├── config/
├── models/
├── route/
└── ...
```

---

## Scripts

### Frontend

- `npm run dev` — Start frontend development server
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint frontend codebase

### Backend

- Run `python app.py` to start the backend Flask server

---

## Additional Notes

- Ensure XAMPP MySQL service is running before starting the backend.
- Configure database credentials properly in `Backend/config/config.py`.
- The backend uses WebSocket for real-time messaging.
- The frontend connects to backend API at `http://localhost:5000` and frontend server runs on port 5173.

---

**TodaNav** — Modern Tricycle Booking for Muntinlupa
