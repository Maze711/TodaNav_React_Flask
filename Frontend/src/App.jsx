import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { UserForm } from "./pages/UserForm";
import { Notif } from "./pages/Notification/Notif";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;