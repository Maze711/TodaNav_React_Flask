import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import bgImage from "../assets/img/login-background.png";
import { SignIn } from "../Components/SignIn";
import { SignUp } from "../Components/SignUp";
import { Toaster } from "react-hot-toast";

export const UserForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <MDBContainer fluid className="p-0 vh-100">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
            maxWidth: '500px',
          },
          error: {
            style: {
              background: '#ff4444',
            },
          },
          success: {
            style: {
              background: '#00C851',
            },
          },
        }}
      />
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

            {/* Toggle Buttons */}
            <div
              className="d-flex p-1 rounded-pill mb-5"
              style={{
                backgroundColor: "#B9B5B0",
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
                type="button"
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
                type="button"
              >
                SIGN UP
              </button>
            </div>

            <div className="mt-4">
              {!isSignUp ? (
                <SignIn setIsSignUp={setIsSignUp} />
              ) : (
                <SignUp setIsSignUp={setIsSignUp} />
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