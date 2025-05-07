import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import bgImage from "../../assets/img/login-background.png";

export const BookingApp = () => {
  return (
    <>
      <MDBContainer fluid className="p-0">
        <div
          className="w-100 position-relative"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        >
          <div
            className="position-absolute w-100 px-3"
            style={{
              bottom: "-50px",
              left: "0",
            }}
          >
            <MDBRow className="justify-content-center">
              <div
                style={{
                  width: "100%",
                  maxWidth: "1450px",
                  padding: "0 1rem",
                }}
              >
                <MDBInputGroup className="mb-4">
                  <MDBInput
                    type="text"
                    placeholder="WHERE TO?"
                    size="lg"
                    className="rounded-pill shadow w-100"
                    style={{
                      border: "1px solid #ddd",
                      padding: "0.75rem 2rem",
                      fontSize: "16px",
                      backgroundColor: "#fff",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </MDBInputGroup>
              </div>
            </MDBRow>
          </div>
        </div>

        <div className="mt-5 pt-3">
          <div className="px-4 py-3">
            <h3 className="fw-bold mb-3">Recently Visited</h3>
            <hr />
            <div className="p-3 border rounded mb-3">
              <strong>Sogo Jr. Hotel Bayanan</strong>
              <p className="mb-0 small text-muted">
                32, Montillano Street cor National Rd, Bayanan, Muntinlupa City
              </p>
            </div>
            <div className="p-3 border rounded mb-3">
              <strong>SMercado Drugstore and Billiards</strong>
              <p className="mb-0 small text-muted">
                69, Mercado Family Street cor National Rd, Bayanan, Muntinlupa
                City
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            <h3 className="fw-bold mb-3">RIDE TO SAVED PLACES</h3>
            <hr />
            <div className="d-flex justify-content-start gap-3 flex-wrap">
              <MDBBtn
                color="light"
                className="text-dark shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="small">Home</span>
              </MDBBtn>
              <MDBBtn
                color="light"
                className="text-dark shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="small">Work</span>
              </MDBBtn>
              <MDBBtn
                color="light"
                className="text-dark shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="small">New</span>
              </MDBBtn>
            </div>
          </div>
        </div>
      </MDBContainer>

      <BottomNav />
    </>
  );
};
