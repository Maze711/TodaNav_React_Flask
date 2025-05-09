import React, { useEffect, createContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { UserForm } from "./pages/UserForm";
import { Messages } from "./pages/Messages/Messages";
import { Notif } from "./pages/Notification/Notif";
import { BookingApp } from "./pages/Booking/Booking";
import { BookingDetail } from "./pages/Booking/BookingDetail";
import { BookingComplete } from "./pages/Booking/BookingComplete";
import { Home } from "./pages/Home/Home";
import { PaymentMethods } from "./pages/PaymentMethods/PaymentMethods";
import { Account } from "./pages/Account/Account";
import { API_BASE_URL } from "./config/config";

export const ApiUrlContext = createContext(API_BASE_URL);
export const UserContext = createContext(null); // Add this

const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();
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
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Optionally, update user context on login/logout elsewhere in your app

  return (
    <ThemeProvider>
      <ApiUrlContext.Provider value={API_BASE_URL}>
        <UserContext.Provider value={user}>
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
              <Route path="/" element={<UserForm setUser={setUser} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/payments" element={<PaymentMethods />} />
              <Route path="/Messages" element={<Messages />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Notif" element={<Notif />} />
              <Route path="/Booking" element={<BookingApp />} />
              <Route path="/BookingDetail" element={<BookingDetail />} />
              <Route path="/BookingComplete" element={<BookingComplete />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </ApiUrlContext.Provider>
    </ThemeProvider>
  );
}

export default App;