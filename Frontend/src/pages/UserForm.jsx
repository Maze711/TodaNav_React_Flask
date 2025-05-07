import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import bgImage from "../assets/img/login-background.png";
import plmunLogo from "../assets/img/Pamantasan_ng_Lungsod_ng_Muntinlupa_logo 2.png";

const SignInForm = ({ setIsSignUp }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in with:", input);
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
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

const SignUpForm = ({ setIsSignUp }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with:", input);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <label className="mb-1 fw-bold" style={{ color: "#214703" }}>
        Name
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
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export const UserForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <MDBContainer fluid className="p-0 vh-100">
      <MDBRow className="g-0 h-100">
        {/* Left Side */}
        <MDBCol
          md="6"
          className="d-flex flex-column align-items-center justify-content-center p-4 h-100"
          style={{ backgroundColor: "white" }}
        >
          <div className="w-100" style={{ maxWidth: "450px" }}>
            <h1 className="text-center mb-4 fw-bold" style={{ color: "black" }}>
              TODA NAV
            </h1>
            <h2 className="text-center mb-5 fw-bold" style={{ color: "black" }}>
              Welcome!
            </h2>

            {/* Toggle Buttons with background container */}
            <div
              className="d-flex p-1 rounded-pill mb-5"
              style={{
                backgroundColor: "#B9B5B0", // updated color
                width: "100%", 
              }}
            >
              <button
                className={`btn rounded-pill py-3 px-4 w-50 fw-bold ${
                  !isSignUp ? "text-dark" : "text-dark"
                }`}
                style={{
                  backgroundColor: !isSignUp ? "#FFFBF6" : "transparent",
                  transition: "all 0.3s ease",
                  border: "none",
                }}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button
                className={`btn rounded-pill py-3 px-4 w-50 fw-bold ${
                  isSignUp ? "text-dark" : "text-dark"
                }`}
                style={{
                  backgroundColor: isSignUp ? "#FFFBF6" : "transparent",
                  transition: "all 0.3s ease",
                  border: "none",
                }}
                onClick={() => setIsSignUp(true)}
              >
                SIGN UP
              </button>
            </div>

            <div className="mt-4">
              {!isSignUp ? (
                <SignInForm setIsSignUp={setIsSignUp} />
              ) : (
                <SignUpForm setIsSignUp={setIsSignUp} />
              )}
            </div>
          </div>
        </MDBCol>

        {/* Right Side - Hidden on Mobile */}
        <MDBCol md="6" className="d-none d-md-flex position-relative h-100">
          <img
            src={bgImage}
            alt="Background"
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              minHeight: "100%",
            }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          ></div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
