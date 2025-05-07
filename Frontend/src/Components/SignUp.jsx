import React, { useState } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";

export const SignUp = ({ setIsSignUp }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Check if inputs are empty
    if (Object.values(input).some(value => value === "")) {
      toast.error("Please fill up all fields!");
      return;
    }
    
    // Check if passwords match
    if (input.password !== input.confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Replace with actual registration API call
      const data = await registerUser(input);
      console.log("Registered user data:", data);
      toast.success("Signup Successful!");
      setIsSignUp(false); // Switch to login after successful registration
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.error || "Something went wrong, please check your connection and try again");
    }
  };

  // Mock registration function - replace with real API call
  const registerUser = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ user: { id: 1, ...userData } });
      }, 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <label className="mb-1 fw-bold" style={{ color: "#214703" }}>
        Full Name
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="text"
        style={{ backgroundColor: "#D9D9D9" }}
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
        
      />

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

      <label className="mb-1 fw-bold" style={{ color: "#214703" }}>
        Confirm Password
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="password"
        style={{ backgroundColor: "#D9D9D9" }}
        value={input.confirmPass}
        onChange={(e) => setInput({ ...input, confirmPass: e.target.value })}
        
      />

      <button
        className="rounded my-3 w-100 p-3 text-white fw-bold border-0 fs-5"
        style={{ backgroundColor: "#B26D18" }}
        type="submit"
      >
        Sign Up
      </button>

      <div className="text-center mt-3">
        <span className="text-muted">Already have an account? </span>
        <button
          className="btn btn-link p-0 text-primary fw-bold"
          onClick={() => setIsSignUp(false)}
          type="button"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};