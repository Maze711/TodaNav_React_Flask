import React, { useState, useContext } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiUrlContext } from "../App";

export const SignIn = ({ setIsSignUp }) => {
  const navigate = useNavigate();
  const apiUrl = useContext(ApiUrlContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(input).some((value) => value === "")) {
      toast.error("Please fill up all fields!");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid email or password");
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
      toast.success("Login successful!");
      navigate('/home');
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <label className="mb-1 fw-bold">Email</label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="email"
        style={{ backgroundColor: "white" }}
        value={input.email}
        onChange={(e) => setInput({ ...input, email: e.target.value })}
      />

      <label className="mb-1 fw-bold" style={{ color: "var(--text-color)" }}>
        Password
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="password"
        style={{ backgroundColor: "white" }}
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
        <span style={{ color: "var(--text-color)" }}>
          Don't have an account?{" "}
        </span>
        <button
          className="btn btn-link p-0 fw-bold"
          style={{ color: "var(--primary-color)" }}
          onClick={() => setIsSignUp(true)}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};