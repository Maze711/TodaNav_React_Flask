import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTheme } from "../../ThemeContext";
import { LocationSearchInput } from "../../Components/LeafLetComponents/LocationSearch";
import { MapView } from "../../Components/LeafLetComponents/MapView";
import userIcon from "../../assets/ico/user.png";
import userWhiteIcon from "../../assets/ico/user-white.png";
import arrowDownIcon from "../../assets/ico/down-arrow.png";
import arrowUpIcon from "../../assets/ico/up-arrows.png";

const muntinlupaLocations = {
  barangays: {
    Alabang: [14.418364, 121.0385],
    "Ayala Alabang": [14.405972, 121.022322],
    Bayanan: [14.407797, 121.049972],
    Buli: [14.443, 121.0505],
    Cupang: [14.4315, 121.04861],
    Poblacion: [14.385411, 121.029033],
    Putatan: [14.398367, 121.036378],
    Sucat: [14.46, 121.049972],
    Tunasan: [14.372544, 121.036378],
  },
  landmarks: {
    "Alabang Town Center": [14.423477, 121.029795],
    "Festival Supermall": [14.4157, 121.038902],
    "St. Jerome Parish Church": [14.421944, 121.031389],
    "Muntinlupa City Hall": [14.395, 121.044167],
    "Muntinlupa Sports Complex": [14.395, 121.044167],
    "Filinvest City": [14.417472, 121.041944],
    "South Luzon Expressway (SLEX) Alabang Exit": [14.43, 121.03],
    "Alabang Public Market": [14.42, 121.03],
    "Muntinlupa National High School": [14.38881, 121.0275],
    "Museo ng Muntinlupa": [14.3735, 121.0455],
    "Jamboree Lake": [14.389, 121.031],
    "Muntinlupa Sunken Garden": [14.388, 121.031],
    "Sucat People's Park": [14.468, 121.045],
  },
  buildings: {
    "Insular Life Corporate Centre": [14.418, 121.03],
    "Westgate Center Alabang": [14.422, 121.03],
    "Commercenter Alabang": [14.42, 121.03],
    "Madrigal Business Park": [14.418, 121.03],
    "Aseana Business Park": [14.518, 120.994],
    "Alabang Medical Clinic": [14.42, 121.03],
    "Asian Hospital and Medical Center": [14.418, 121.03],
    "Muntinlupa Doctors Hospital": [14.395, 121.044167],
    "Alabang Convention Center": [14.418, 121.03],
  },
  schools: {
    "Muntinlupa National High School": [14.38881, 121.0275],
    "Santo Niño School of Muntinlupa": [14.38606, 121.04791],
    "Muntinlupa Science High School": [14.38407, 121.0519],
    "De La Salle Santiago Zobel School": [14.405, 121.022],
    "Southernside Montessori School": [14.3878877, 121.039171],
    "South Crest School": [14.398, 121.035],
    "Muntinlupa Business High School": [14.426, 121.045],
    "Pamantasan ng Lungsod ng Muntinlupa": [14.3891, 121.0253],
  },
};

export const BookingDetail = () => {
  const { isDark } = useTheme();
  const containerBg = isDark ? "#121212" : "white";
  const textColor = isDark ? "#fff" : "#000";
  const profileIcon = isDark ? userIcon : userWhiteIcon;
  const circleBg = isDark ? "#fff" : "transparent";
  const mainBorder = "#B26D18";

  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [mapCenter, setMapCenter] = useState([14.4167, 121.0333]);
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(true);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateFare = (dist) => {
    const baseFare = 40;
    const perKm = 12;
    return Math.round(baseFare + dist * perKm);
  };

  useEffect(() => {
    if (fromCoords && toCoords) {
      const dist = calculateDistance(
        fromCoords[0],
        fromCoords[1],
        toCoords[0],
        toCoords[1]
      );
      setDistance(dist.toFixed(1));
      setFare(calculateFare(dist));
      setMapCenter([
        (fromCoords[0] + toCoords[0]) / 2,
        (fromCoords[1] + toCoords[1]) / 2,
      ]);
    }
  }, [fromCoords, toCoords]);

  const handleLocationSelect = (location, setSearch, setCoords) => {
    let coordinates = null;
    for (const category of Object.values(muntinlupaLocations)) {
      if (category[location]) {
        coordinates = category[location];
        break;
      }
    }
    if (coordinates) {
      setSearch(location);
      setCoords(coordinates);
      setMapCenter(coordinates);
    }
  };

  const handleBookRide = () => {
    if (!fromCoords || !toCoords) {
      alert("Please select both pickup and dropoff locations");
      return;
    }
    setIsBooking(true);
    setTimeout(() => {
      alert(`Ride booked! Your fare is ₱${fare}`);
      setIsBooking(false);
    }, 1500);
  };

  return (
    <MDBContainer fluid className="p-0 vh-100" style={{ position: "relative" }}>
      {/* Map */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <MapView
          center={mapCenter}
          fromCoords={fromCoords}
          toCoords={toCoords}
          fromSearch={fromSearch}
          toSearch={toSearch}
          isDark={isDark}
        />
      </div>

      {/* Search Bar */}
      <div
        className="rounded-4 shadow-5 p-3"
        style={{
          position: "absolute",
          top: "20px",
          zIndex: 1,
          backgroundColor: containerBg,
          width: "90%",
          left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      >
        <MDBRow
          className="align-items-center justify-content-center"
          style={{ pointerEvents: "auto" }}
        >
          <MDBCol md="5">
            <LocationSearchInput
              value={fromSearch}
              onChange={(e) => setFromSearch(e.target.value)}
              placeholder="From (e.g., Bayanan)"
              locations={muntinlupaLocations}
              onSelect={(location) =>
                handleLocationSelect(location, setFromSearch, setFromCoords)
              }
              isDark={isDark}
              textColor={textColor}
              mainBorder={mainBorder}
              containerBg={containerBg}
            />
          </MDBCol>
          <MDBCol md="2" className="text-center">
            <span style={{ fontSize: "1.5rem", color: mainBorder }}>→</span>
          </MDBCol>
          <MDBCol md="5">
            <LocationSearchInput
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              placeholder="To (e.g., Alabang)"
              locations={muntinlupaLocations}
              onSelect={(location) =>
                handleLocationSelect(location, setToSearch, setToCoords)
              }
              isDark={isDark}
              textColor={textColor}
              mainBorder={mainBorder}
              containerBg={containerBg}
            />
          </MDBCol>
        </MDBRow>
      </div>

      {/* Toggle Arrow */}
      <div
        style={{
          position: "fixed",
          bottom: showTripDetails ? "275px" : "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          cursor: "pointer",
          backgroundColor: containerBg,
          borderRadius: "50%",
          padding: "0.5rem",
          border: `2px solid ${mainBorder}`,
        }}
        onClick={() => setShowTripDetails((prev) => !prev)}
      >
        <img
          src={showTripDetails ? arrowDownIcon : arrowUpIcon}
          alt="toggle arrow"
          style={{ width: "24px", height: "24px" }}
        />
      </div>

      {/* Trip Details Panel */}
      {showTripDetails && (
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
            backgroundColor: containerBg,
            boxShadow: "0 -5px 15px rgba(0,0,0,0.1)",
            pointerEvents: "auto",
          }}
        >
          <div className="p-4">
            <h3 className="fw-bold text-center" style={{ color: textColor }}>
              Trip Details
            </h3>
            <hr style={{ border: "2px solid", borderColor: "black" }} />
            <div
              className="d-flex align-items-center mb-3"
              style={{
                border: `2px solid ${mainBorder}`,
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
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
              <div style={{ flexGrow: 1 }}>
                <h5 className="fw-bold mb-1" style={{ color: textColor }}>
                  Kurt Dominic Pansib{" "}
                  <span style={{ fontWeight: "normal" }}>(09698739067)</span>
                </h5>
                <p className="mb-0" style={{ color: textColor }}>
                  {fromCoords && toCoords
                    ? `Distance: ${distance} km`
                    : "Select pickup and dropoff locations"}
                </p>
              </div>
              <div className="text-end">
                <span style={{ color: textColor, fontWeight: "bold" }}>
                  Estimated fare:{" "}
                </span>
                <span className="fw-bold" style={{ color: textColor }}>
                  {fare ? `₱${fare}` : "—"}
                </span>
              </div>
            </div>

            <button
              className="btn btn-success w-100"
              style={{ backgroundColor: mainBorder, border: "none" }}
              onClick={handleBookRide}
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Book Ride"}
            </button>
          </div>
        </div>
      )}
    </MDBContainer>
  );
};
