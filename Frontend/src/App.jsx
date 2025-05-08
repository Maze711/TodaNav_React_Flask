import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { ThemeProvider, useTheme } from "./ThemeContext";
import { UserForm } from "./pages/UserForm";
import { Notif } from "./pages/Notification/Notif";
import { BookingApp } from "./pages/Booking/Booking";
import { BookingDetail } from "./pages/Booking/BookingDetail";

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  // Dynamically update the body class based on the theme
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
      }}
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ThemeToggleButton />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "#198754",
              },
            },
            error: {
              style: {
                background: "#dc3545",
              },
            },
          }}
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/Notif" element={<Notif />} />
          <Route path="/Booking" element={<BookingApp />} />
          <Route path="/BookingDetail" element={<BookingDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;