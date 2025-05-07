import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import bgImage from "../../assets/img/LandingBanner.png";
import userIcon from "../../assets/ico/user.png";
import userWhiteIcon from "../../assets/ico/user-white.png";
import { useTheme } from "../../ThemeContext";

export const BookingDetail = () => {
  const { isDark } = useTheme();
  const containerBg = isDark ? "#121212" : "white";
  const textColor = isDark ? "#fff" : "#000";
  const profileIcon = isDark ? userIcon : userWhiteIcon;
  const circleBg = isDark ? "#fff" : "transparent";
  const mainBorder = "#B26D18";

  return (
    <MDBContainer fluid className="p-0 vh-100" style={{ position: "relative" }}>
      {/* Fixed background image */}
      <div
        className="w-100"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
          zIndex: -1,
        }}
      ></div>

      {/* Header overlay without extra top margin */}
      <div
        className="rounded-4 shadow-5 p-3 mx-4"
        style={{ position: "absolute", top: "20px", zIndex: 1, backgroundColor: "white" }}
      >
        <MDBRow className="align-items-center text-center">
          <MDBCol>
            <h2 className="fw-bold mb-1" style={{ color: "#000", fontSize: "1.5rem" }}>
              Bayanan TODA multipurpose hall
            </h2>
          </MDBCol>
          <MDBCol size="auto">
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              →
            </span>
          </MDBCol>
          <MDBCol>
            <h3 className="fw-bold mt-1" style={{ color: "#000", fontSize: "1.2rem" }}>
              Sogo Jr. Hotel Bayanan
            </h3>
          </MDBCol>
        </MDBRow>
      </div>

      {/* Fixed content container at the bottom */}
      <div
        className="px-4"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          border: `2px solid ${mainBorder}`,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: containerBg,
          paddingBottom: "1rem",
          overflowY: "auto",
          boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="rounded-4 shadow-5 p-4 mb-4 text-center sticky-top"
          style={{ backgroundColor: containerBg }}
        >
          <h3 className="fw-bold mb-1" style={{ fontSize: "1.75rem", color: textColor }}>
            Trip Details
          </h3>
          <hr style={{ border: "2px solid", borderColor: textColor, margin: "0" }} />
        </div>
        <div
          className="rounded-4 shadow-5 p-4 mb-4 position-relative"
          style={{
            borderRadius: "12px",
            backgroundColor: containerBg,
            border: `2px solid ${mainBorder}`,
            color: textColor,
          }}
        >
          <div className="row align-items-center">
            <div className="col-auto">
              <div
                style={{
                  width: "54px",
                  borderRadius: "50%",
                  backgroundColor: circleBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "1rem",
                }}
              >
                <img
                  src={profileIcon}
                  alt="Profile"
                  width="50"
                  height="50"
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="col">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="fw-bold mb-0" style={{ color: textColor }}>
                    Kurt Dominic Pansib{" "}
                    <span style={{ fontWeight: "normal" }}>(09698739967)</span>
                  </h5>
                  <p className="mb-0" style={{ color: textColor }}>
                    I will be there in 2 minutes, 1km away from pickup point
                  </p>
                </div>
                <div className="col-auto">
                  <div className="text-end">
                    <span style={{ color: textColor }}>Estimated fare: </span>
                    <span className="fw-bold" style={{ color: textColor }}>
                      13 pesos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "auto", padding: "1rem" }}>
          <button
            className="w-100 rounded-pill py-3 fw-bold shadow btn-lg"
            style={{
              backgroundColor: mainBorder,
              borderColor: mainBorder,
              color: "#fff",
              border: "none",
              outline: "none",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            Book Ride
          </button>
        </div>
      </div>
    </MDBContainer>
  );
};