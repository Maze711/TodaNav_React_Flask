import React, { useEffect, createContext, useState, useContext } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import { TodaList } from "./pages/TodaList/TodaList";
import { API_BASE_URL } from "./config/config";
import {
  NotificationProvider,
  NotificationContext,
} from "./contexts/NotificationContext";
import { io } from "socket.io-client";
import { LocationProvider } from "./contexts/LocationContext";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { SidebarProvider } from "./contexts/SideBarContext";
import { AdminNews } from "./pages/Admin/News/AdminNews";

export const ApiUrlContext = createContext(API_BASE_URL);
export const UserContext = createContext(null);

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

function GlobalNotificationListener({ socket, user }) {
  const { addNotification } = useContext(NotificationContext);
  const location = useLocation();

  useEffect(() => {
    if (!socket || !user) return;

    socket.on("new_booking", (data) => {
      addNotification({
        id: Date.now(),
        sender: "System",
        message: `New booking created! Booking ID: ${data.booking_id}, From: ${data.from_location}, To: ${data.to_location}`,
        time: new Date().toLocaleTimeString(),
        bookingDetails: data,
      });
    });

    return () => {
      socket.off("new_booking");
    };
  }, [socket, user, addNotification]);

  return null;
}

function App() {
  const [user, setUser] = useState(() => {
    // Try to get user from localStorage
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Sync user state with localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      console.log("Logged-in user:", user);
    } else {
      console.log("No user is logged in.");
    }
  }, [user]);

  useEffect(() => {
    if (user && !socket) {
      const s = io("http://127.0.0.1:5000", { query: { role: user.role } });
      setSocket(s);
      return () => s.disconnect();
    }
  }, [user]);

  return (
    <ThemeProvider>
      <ApiUrlContext.Provider value={API_BASE_URL}>
        <UserContext.Provider value={{ user, setUser }}>
          <NotificationProvider>
            <LocationProvider>
              <SidebarProvider>
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
                  <GlobalNotificationListener socket={socket} user={user} />
                  <Routes>
                    <Route path="/" element={<UserForm setUser={setUser} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/payments" element={<PaymentMethods />} />
                    <Route path="/Messages" element={<Messages />} />
                    <Route path="/todaList" element={<TodaList />} />
                    <Route path="/Account" element={<Account />} />
                    <Route path="/Notif" element={<Notif />} />
                    <Route path="/Booking" element={<BookingApp />} />
                    <Route path="/BookingDetail" element={<BookingDetail />} />
                    <Route
                      path="/BookingComplete"
                      element={<BookingComplete />}
                    />
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/admin/news" element={<AdminNews />} />
                  </Routes>
                </Router>
              </SidebarProvider>
            </LocationProvider>
          </NotificationProvider>
        </UserContext.Provider>
      </ApiUrlContext.Provider>
    </ThemeProvider>
  );
}

export default App;
