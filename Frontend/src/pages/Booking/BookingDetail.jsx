import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTheme } from "../../ThemeContext";
import { LocationSearchInput } from "../../Components/LeafLetComponents/LocationSearch";
import { MapView } from "../../Components/LeafLetComponents/MapView";
import userIcon from "../../assets/ico/user.png";
import userWhiteIcon from "../../assets/ico/user-white.png";
import arrowDownIcon from "../../assets/ico/down-arrow.png";
import arrowUpIcon from "../../assets/ico/up-arrows.png";
import { io } from "socket.io-client";
import { UserContext } from "../../App";

export const muntinlupaLocations = {
  barangays: {
    Alabang: [14.418364, 121.0385],
    "Ayala Alabang": [14.406064, 121.022355],
    Bayanan: [14.407797, 121.049972],
    Buli: [14.443, 121.0505],
    Cupang: [14.4315, 121.04861],
    "New Alabang Village": [14.4175, 121.0275],
    Poblacion: [14.385411, 121.029033],
    Putatan: [14.398367, 121.036378],
    Sucat: [14.4365, 121.0503],
    Tunasan: [14.372544, 121.036378],
  },
  landmarks: {
    "Alabang Town Center": [14.423477, 121.029795],
    "Festival Malls": [14.4157, 121.038902],
    "St. Jerome Parish Church": [14.421944, 121.031389],
    "Muntinlupa City Hall": [14.385411, 121.029033],
    "Muntinlupa Sports Complex": [14.383712, 121.02895],
    "Filinvest City": [14.417472, 121.041944],
    "South Luzon Expressway (SLEX) Alabang Exit": [14.43, 121.03],
    "Alabang Public Market": [14.42, 121.03],
    "Museo ng Muntinlupa": [14.385411, 121.029033],
    "Jamboree Lake": [14.389, 121.031],
    "Muntinlupa Sunken Garden": [14.385411, 121.029033],
    "Sucat People's Park": [14.468, 121.045],
    "Japanese Cemetery": [14.385, 121.032],
    "Sacred Heart of Jesus Parish": [14.386, 121.034],
    "Memorial Hill": [14.388, 121.033],
    "Alabang Philippines Temple": [14.417, 121.038],
  },
  buildings: {
    "Insular Life Corporate Centre I": [14.418, 121.03],
    "Bristol at Parkway Place": [14.421, 121.03],
    "Insular Life Corporate Centre II": [14.419, 121.03],
    "Commercenter Alabang": [14.42, 121.03],
    "Madrigal Business Park": [14.418, 121.03],
    "Alabang Medical Clinic": [14.42, 121.03],
    "Asian Hospital and Medical Center": [14.418, 121.03],
    "Muntinlupa Doctors Hospital": [14.385411, 121.029033],
    "Alabang Convention Center": [14.417, 121.038],
    "Botanika Nature Residences": [14.417, 121.038],
    "South Park District": [14.417, 121.038],
  },
  schools: {
    "Muntinlupa National High School": [14.38881, 121.0275],
    "Santo Niño School of Muntinlupa": [14.38606, 121.04791],
    "Muntinlupa Science High School": [14.38407, 121.0519],
    "De La Salle Santiago Zobel School": [14.405, 121.022],
    "Southernside Montessori School": [14.387887, 121.039171],
    "South Crest School": [14.398, 121.035],
    "Muntinlupa Business High School": [14.426, 121.045],
    "Pamantasan ng Lungsod ng Muntinlupa": [14.385411, 121.029033],
    "Lyceum of Alabang INC.": [14.417, 121.038],
    "Holy Infant Academy": [14.386, 121.034],
    "Infant Jesus Montessori School of Muntinlupa": [14.385, 121.033],
    "Tunasan Elementary School": [14.372544, 121.036378],
    "Victoria Elementary School": [14.373, 121.037],
    "Christian Love School": [14.374, 121.038],
    "Itaas Elementary School": [14.375, 121.039],
    "Poblacion Elementary School": [14.385411, 121.029033],
    "Muntinlupa Christian Academy": [14.377, 121.041],
    "Muntinlupa Elementary School": [14.385411, 121.029033],
    "Poblacion National High School": [14.385411, 121.029033],
    "Our Lady of The Abandoned Catholic School": [14.38, 121.044],
    "Putatan Elementary School": [14.398367, 121.036378],
    "South Mansfield College": [14.382, 121.046],
    "Soldier's Hills Elementary School": [14.383, 121.047],
    "Bayanan Elementary School": [14.407797, 121.049972],
    "Maranatha Christian Academy - Bayanan": [14.407797, 121.049972],
    "Alabang Elementary School": [14.418364, 121.0385],
    "Far Eastern University Alabang": [14.418364, 121.0385],
    "Liceo de Alabang, Inc.": [14.418364, 121.0385],
    "Saint Bernadette College of Alabang": [14.406064, 121.022355],
    "San Roque Catholic School": [14.385411, 121.029033],
    "STI College (Alabang Branch)": [14.418364, 121.0385],
    "Maria Montessori Foundation": [14.406064, 121.022355],
    "PAREF Woodrose School": [14.406064, 121.022355],
    "Cupang Elementary School": [14.4315, 121.04861],
    "San Beda College Alabang": [14.406064, 121.022355],
    "Buli Elementary School": [14.443, 121.0505],
    "Muntinlupa Business High School (Sucat Annex)": [14.4365, 121.0503],
    "Sucat Elementary School": [14.4365, 121.0503],
    "Colegio De Muntinlupa": [14.4365, 121.0503],
  },
};

const socket = io("http://127.0.0.1:5000"); // Connect to the WebSocket server

export const BookingDetail = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Access user details from context
  const containerBg = isDark ? "#202124" : "white";
  const textColor = isDark ? "#fff" : "#000";
  const profileIcon = isDark ? userIcon : userWhiteIcon;
  const circleBg = isDark ? "#fff" : "transparent";
  const mainBorder = "#B26D18";

  // Helper to get query params
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param) || "";
  };

  const [fromSearch, setFromSearch] = useState(getQueryParam("from"));
  const [toSearch, setToSearch] = useState("");
  const [mapCenter, setMapCenter] = useState([14.4167, 121.0333]);
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [rideDone, setRideDone] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(true);
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    if (fromSearch) {
      let coordinates = null;
      for (const category of Object.values(muntinlupaLocations)) {
        if (category[fromSearch]) {
          coordinates = category[fromSearch];
          break;
        }
      }
      if (coordinates) {
        setFromCoords(coordinates);
        setMapCenter(coordinates);
        setTripDetails((prev) => ({
          ...prev,
          from_location: fromSearch,
        }));
      }
    }
  }, [fromSearch]);

  // Listen for booking confirmation from the backend
  useEffect(() => {
    socket.on("booking_confirmation", (data) => {
      setTripDetails((prev) => ({
        ...prev,
        booking_id: data.booking_id,
        from_location: data.from_location,
        to_location: data.to_location,
      }));
    });

    return () => {
      socket.off("booking_confirmation");
    };
  }, []);

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

  const handleLocationSelect = (location, setSearch, setCoords, field) => {
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
      setTripDetails((prev) => ({
        ...prev,
        [field]: location,
      }));
    }
  };

  const handleBookRide = () => {
    if (!fromCoords || !toCoords) {
      alert("Please select both pickup and dropoff locations");
      return;
    }

    setIsBooking(true);

    const bookingId = `BOOKING_${Date.now()}`;
    setTripDetails((prev) => ({
      ...prev,
      booking_id: bookingId,
      from_location: fromSearch,
      to_location: toSearch,
    }));

    socket.emit("create_booking", {
      booking_id: bookingId,
      user_id: user?.user_id,
      role: user?.role,
      from_location: fromSearch,
      to_location: toSearch,
    });

    setTimeout(() => {
      setIsBooking(false);
      setRideDone(true);
    }, 1500);
  };

  const handleRideDone = () => {
    navigate("/BookingComplete");
  };

  return (
    <MDBContainer fluid className="p-0 vh-100" style={{ position: "relative" }}>
      <h1>Welcome, {user?.name || "Guest"}!</h1>
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
                handleLocationSelect(location, setFromSearch, setFromCoords, "from_location")
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
                handleLocationSelect(location, setToSearch, setToCoords, "to_location")
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
                  {tripDetails?.rider_name || "Rider Name"}{" "}
                  <span style={{ fontWeight: "normal" }}>
                    ({tripDetails?.user_id || "Rider ID"})
                  </span>
                </h5>
                <p className="mb-0" style={{ color: textColor }}>
                  Booking ID: {tripDetails?.booking_id || "—"}
                </p>
                <p className="mb-0" style={{ color: textColor }}>
                  From: {tripDetails?.from_location || fromSearch || "—"} To: {tripDetails?.to_location || toSearch || "—"}
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

            {!rideDone ? (
              <button
                className="btn btn-success w-100"
                style={{ backgroundColor: mainBorder, border: "none" }}
                onClick={handleBookRide}
                disabled={isBooking}
              >
                {isBooking ? "Booking..." : "Book Ride"}
              </button>
            ) : (
              <button
                className="btn btn-primary w-100"
                style={{ backgroundColor: "#198754", border: "none" }}
                onClick={handleRideDone}
              >
                Ride Done
              </button>
            )}
          </div>
        </div>
      )}
    </MDBContainer>
  );
};