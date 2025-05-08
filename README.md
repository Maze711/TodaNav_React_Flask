# TodaNav Frontend

This is the frontend for the TodaNav project, a React-based web application for booking and managing tricycle rides in Muntinlupa. It features a modern UI, dark mode support, interactive maps, and notification management.

## Features

- **User Authentication:** Sign up and sign in forms with validation.
- **Booking:** Search for pickup and dropoff locations, view routes on a map, and calculate fares.
- **Notifications:** View and filter system and news notifications.
- **Dark Mode:** Toggle between light and dark themes.
- **Responsive Design:** Works well on both desktop and mobile devices.
- **Bottom Navigation:** Quick access to main app sections.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [MDB React UI Kit](https://mdbootstrap.com/docs/react/)
- [React Leaflet](https://react-leaflet.js.org/) for maps
- [Bootstrap 5](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [React Hot Toast](https://react-hot-toast.com/) for notifications

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
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

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

```
Frontend/
├── public/
├── src/
│   ├── assets/           # Images and icons
│   ├── Components/       # Reusable components (BottomNav, SignIn, SignUp, etc.)
│   ├── pages/            # Page components (Booking, Notification, UserForm, etc.)
│   ├── ThemeContext.jsx  # Theme (dark/light) context provider
│   ├── App.jsx           # Main app component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── package.json
└── vite.config.js
```

## Customization

- **Theme:** Toggle dark/light mode using the button at the top right.
- **Map:** Uses OpenStreetMap tiles and OSRM for routing.
- **Icons:** Place your own icons in `src/assets/ico/` as needed.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint the codebase

## Backend

See the `../Backend` folder for the Flask backend API.

---

**TodaNav** — Modern Tricycle Booking for Muntinlupa