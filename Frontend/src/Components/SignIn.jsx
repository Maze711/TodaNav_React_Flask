import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";

export const SignIn = ({ setIsSignUp }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check empty fields
    if (Object.values(input).some(value => value === "")) {
      toast.error("Please fill up all fields!");
      return;
    }

    try {
      // Replace with actual authentication API call
      const data = await authenticateUser(input);
      console.log("Logged in user data:", data);
      toast.success("Login successful!");
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Invalid email or password");
    }
  };

  // Mock authentication function - replace with real API call
  const authenticateUser = async (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === "user@example.com" && credentials.password === "password123") {
          resolve({ user: { id: 1, name: "Test User", email: credentials.email } });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <label className="mb-1 fw-bold" style={{ color: "#214703" }}>
        Email
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="email"
        style={{ backgroundColor: "#D9D9D9" }}
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
        
      />

      <label className="mb-1 fw-bold" style={{ color: "#214703" }}>
        Password
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="password"
        style={{ backgroundColor: "#D9D9D9" }}
        value={input.password}
        onChange={(e) => setInput({ ...input, password: e.target.value })}
        
      />

      <button
        className="rounded my-3 w-100 p-3 text-white fw-bold border-0 fs-5"
        style={{ backgroundColor: "#B26D18" }}
        type="submit"
      >
        Continue
      </button>

      <div className="text-center mt-3">
        <span className="text-muted">Don't have an account? </span>
        <button
          className="btn btn-link p-0 text-primary fw-bold"
          onClick={() => setIsSignUp(true)}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};