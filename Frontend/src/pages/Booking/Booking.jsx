import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInputGroup,
  MDBInput,
} from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import bgImage from "../../assets/img/LandingBanner.png";
import { useTheme } from "../../ThemeContext";
import { LocationSearchInput } from "../../Components/LeafLetComponents/LocationSearch";
import { useNavigate } from "react-router-dom";
import { muntinlupaLocations } from "../../contexts/LocationContext.jsx";

export const BookingApp = () => {
  const { isDark } = useTheme();
  const textStyle = { color: isDark ? "#fff" : "inherit" };
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const mainBorder = isDark ? "#fff" : "#222";
  const containerBg = isDark ? "#222" : "#fff";
  const textColor = isDark ? "#fff" : "#222";

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSelect = (location) => {
    setSearchValue(location);
    // Pass both from and to as empty string initially, so user can select both in BookingDetail
    navigate(`/BookingDetail?from=${encodeURIComponent(location)}&to=`, { state: { hideSearchInput: true } });
  };

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
              bottom: "-30px",
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
                <LocationSearchInput
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="WHERE TO?"
                  locations={muntinlupaLocations()}
                  onSelect={handleSelect}
                  isDark={isDark}
                  textColor={textColor}
                  mainBorder={mainBorder}
                  containerBg={"#fff"}
                />
              </div>
            </MDBRow>
          </div>
        </div>

        <div className="mt-5 pt-3">
          <div className="px-4 py-3">
            <h3 className="fw-bold mb-3" style={textStyle}>
              Recently Visited
            </h3>
            <hr />
            <div className="p-3 border rounded mb-3">
              <strong style={textStyle}>Sogo Jr. Hotel Bayanan</strong>
              <p className="mb-0 small" style={textStyle}>
                32, Montillano Street cor National Rd, Bayanan, Muntinlupa City
              </p>
            </div>
            <div className="p-3 border rounded mb-3">
              <strong style={textStyle}>
                SMercado Drugstore and Billiards
              </strong>
              <p className="mb-0 small" style={textStyle}>
                69, Mercado Family Street cor National Rd, Bayanan, Muntinlupa
                City
              </p>
            </div>
          </div>

          <div className="px-4 py-3">
            <h3 className="fw-bold mb-3" style={textStyle}>
              RIDE TO SAVED PLACES
            </h3>
            <hr />
            <div className="d-flex justify-content-start gap-3 flex-wrap">
              <MDBBtn
                color="light"
                className="shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="small">Home</span>
              </MDBBtn>
              <MDBBtn
                color="light"
                className="shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <span className="small">Work</span>
              </MDBBtn>
              <MDBBtn
                color="light"
                className="shadow-sm rounded-circle d-flex flex-column align-items-center justify-content-center"
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