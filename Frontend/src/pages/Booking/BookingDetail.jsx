import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
} from "mdb-react-ui-kit";
import bgImage from "../../assets/img/login-background.png";
import userIcon from "../../assets/ico/user.png";

export const BookingDetail = () => {
  return (
    <MDBContainer fluid className="p-0 vh-100" style={{ position: "relative" }}>
      {/* Background Image */}
      <div
        className="w-100"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
          filter: "brightness(0.7)",
        }}
      ></div>

      {/* Main Content */}
      <div
        className="px-4"
        style={{
          position: "relative",
          zIndex: 1,
          border: "4px solid #3b71ca",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {/* Info Container */}
        <div className="bg-white rounded-4 shadow-5 p-4 mb-4">
          {/* Hall Info */}
          <div className="mb-3">
            <h2 className="fw-bold mb-3">Bayanan TODA multipurpose hall</h2>
            <p className="text-muted mb-3">
              Skyway Stage 3 / Northbound NLEX...
            </p>
          </div>
          {/* Trip Address Info */}
          <div className="mb-3">
            <h3 className="fw-bold mb-3 text-center">Sogo Jr. Hotel Bayanan</h3>
            <MDBListGroup className="mb-3">
              <MDBListGroupItem className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  id="check1"
                  checked
                />
                <label htmlFor="check1" className="mb-0">
                  Palmares Court
                </label>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  id="check2"
                />
                <label htmlFor="check2" className="mb-0">
                  Bvorhsung St Google
                </label>
              </MDBListGroupItem>
              <MDBListGroupItem className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  id="check3"
                />
                <label htmlFor="check3" className="mb-0">
                  Rao Apartment
                </label>
              </MDBListGroupItem>
            </MDBListGroup>
          </div>
          {/* Badge Container */}
          <div>
            <MDBBadge color="light" className="text-dark me-2">
              Layers
            </MDBBadge>
            <MDBBadge color="light" className="text-dark">
              A1126
            </MDBBadge>
          </div>
        </div>

        {/* Trip Details Header Container */}
        <div className="bg-white rounded-4 shadow-5 p-4 mb-4 text-center">
          <h3 className="fw-bold mb-1" style={{ fontSize: "1.75rem" }}>
            Trip Details
          </h3>
          <hr style={{ border: "1px solid black", margin: "0" }} />
        </div>

        {/* Driver Info Card */}
        <div
          className="bg-white rounded-4 shadow-5 p-4 mb-4 position-relative"
          style={{
            border: "4px solid #3b71ca",
            borderLeft: "4px solid #3b71ca",
            borderRadius: "12px",
          }}
        >
          <div
            className="position-absolute top-0 start-0 translate-middle-y ms-3 bg-white px-2"
            style={{
              clipPath: "polygon(0 50%, 100% 0, 100% 100%)",
              width: "20px",
              height: "20px",
              left: "0",
            }}
          ></div>

          <div className="d-flex align-items-center mb-3">
            <img
              src={userIcon}
              alt="Profile"
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <h5 className="fw-bold mb-0">Kurt Dominic Pansib</h5>
          </div>
          <p className="text-muted mb-2">(69698739667)</p>
          <p className="mb-3">
            I will be there in 2 minutes, 1km away from pickup point
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted">Estimated fare:</span>
              <span className="fw-bold ms-2">13 pesos</span>
            </div>
          </div>
        </div>

        {/* Book Ride Button Container */}
        <div className="p-4">
          <MDBBtn
            color="primary"
            size="lg"
            className="w-100 rounded-pill py-3 fw-bold shadow"
          >
            Book Ride
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
};
