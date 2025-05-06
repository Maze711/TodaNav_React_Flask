import { useState } from "react";
import { SignIn } from "../Components/SignIn";
import { SignUp } from "../Components/SignUp";

export const UserForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="d-flex min-vh-100">
      {/* Left Half - Form Section */}
      <div
        className="d-flex flex-column align-items-center justify-content-center min-vh-100 flex-grow-1 bg-white"
        style={{ padding: "50px" }}
      >
        {/* Logo and Title */}
        <div className="text-center mb-4">
          <h1 className="fw-bold">TODA NAV</h1>
        </div>

        {/* Toggle Buttons */}
        <div className="d-flex mb-5">
          <button
            className={`btn rounded-pill py-2 px-4 w-50 ${
              !isSignUp
                ? "btn-primary text-white"
                : "btn-outline-secondary text-muted"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            SIGN IN
          </button>
          <button
            className={`btn rounded-pill py-2 px-4 w-50 ms-2 ${
              isSignUp
                ? "btn-primary text-white"
                : "btn-outline-secondary text-muted"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            SIGN UP
          </button>
        </div>

        {/* Form Content */}
        <div className="mt-4" style={{ width: "100%", maxWidth: "450px" }}>
          {!isSignUp ? (
            <SignIn setIsSignUp={setIsSignUp} />
          ) : (
            <SignUp setIsSignUp={setIsSignUp} />
          )}
        </div>
      </div>

      {/* Right Half - Image Section */}
      <div className="w-50 p-0">
        <div className="h-100 position-relative">
          <div
            className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white"
            style={{
              backgroundColor: "rgba(13, 41, 1, 0.70)",
            }}
          >
            <img src="/path/to/logo.png" alt="Logo" style={{ width: "150px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};