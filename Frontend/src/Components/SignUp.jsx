import React, { useState, useContext } from "react";
import { MDBInput } from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { ApiUrlContext } from "../App";

export const SignUp = ({ setIsSignUp }) => {
  const apiUrl = useContext(ApiUrlContext);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(input).some((value) => value === "")) {
      toast.error("Please fill up all fields!");
      return;
    }

    if (input.password !== input.confirmPass) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          password: input.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      toast.success("Signup Successful!");
      setIsSignUp(false);
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong, please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <label className="mb-1 fw-bold" style={{ color: "var(--text-color)" }}>
        Full Name
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="text"
        style={{ backgroundColor: "white" }}
        value={input.name}
        onChange={(e) => setInput({ ...input, name: e.target.value })}
      />

      <label className="mb-1 fw-bold" style={{ color: "var(--text-color)" }}>
        Email
      </label>
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

      <label className="mb-1 fw-bold" style={{ color: "var(--text-color)" }}>
        Confirm Password
      </label>
      <MDBInput
        wrapperClass="mb-3 w-100"
        type="password"
        style={{ backgroundColor: "white" }}
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
        <span style={{ color: "var(--text-color)" }}>
          Already have an account?{" "}
        </span>
        <button
          className="btn btn-link p-0 fw-bold"
          style={{ color: "var(--primary-color)" }}
          onClick={() => setIsSignUp(false)}
          type="button"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};