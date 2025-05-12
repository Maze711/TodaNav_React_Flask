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
import { ToggleChat } from "../../Components/ToggleChat";
import { muntinlupaLocations, calculateDistance, calculateFare, LocationContext, findNearbyTODA } from "../../contexts/LocationContext.jsx";

const socket = io("http://127.0.0.1:5000");

export const BookingDetail = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userLocation, findNearbyTODA } = useContext(LocationContext);

  const containerBg = isDark ? "#202124" : "white";
  const textColor = isDark ? "#fff" : "#000";
  const profileIcon = isDark ? userIcon : userWhiteIcon;
  const circleBg = isDark ? "#fff" : "transparent";
  const mainBorder = "#B26D18";

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
  const [showChat, setShowChat] = useState(false);
  const [chatProps, setChatProps] = useState({});
  const [nearbyTODAs, setNearbyTODAs] = useState([]);

  useEffect(() => {
    if (fromSearch) {
      let coordinates = null;
      for (const category of Object.values(muntinlupaLocations())) {
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

  useEffect(() => {
    socket.on("booking_confirmation", (data) => {
      setTripDetails((prev) => ({
        ...prev,
        booking_id: data.booking_id,
        from_location: data.from_location,
        to_location: data.to_location,
      }));
    });

    socket.on("booking_accepted", (data) => {
      if (data.booking_id === tripDetails?.booking_id) {
        setShowChat(true);
        setChatProps({
          userName: user?.name || "User",
          bookingId: data.booking_id,
          riderName: data.rider_name,
        });
      }
      setTripDetails((prev) => ({
        ...prev,
        rider_name: data.rider_name,
        user_id: data.user_id,
      }));
    });

    return () => {
      socket.off("booking_confirmation");
      socket.off("booking_accepted");
    };
  }, [tripDetails?.booking_id, user?.name]);

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

  useEffect(() => {
    if (userLocation && userLocation.length === 2) {
      const nearby = findNearbyTODA(userLocation[0], userLocation[1]);
      setNearbyTODAs(nearby);
      setMapCenter(userLocation);
    }
  }, [userLocation, findNearbyTODA]);

  const handleLocationSelect = (location, setSearch, setCoords, field) => {
    let coordinates = null;
    for (const category of Object.values(muntinlupaLocations())) {
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
          todaMarkers={nearbyTODAs}
          userLocation={userLocation}  // Pass userLocation to MapView
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
              locations={muntinlupaLocations()}
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
              locations={muntinlupaLocations()}
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

      {/* Container wrapping TODA info, horizontal line, and rider info */}
      <div
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
          padding: "1rem 1.5rem 1.5rem 1.5rem",
        }}
      >
        {/* Toggle button attached to this container */}
        <div
          style={{
            position: "absolute",
            top: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: containerBg,
            border: `2px solid ${mainBorder}`,
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            transition: "background-color 0.3s ease",
            zIndex: 2,
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = mainBorder}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = containerBg}
          onClick={() => setShowTripDetails((prev) => !prev)}
        >
          <img
            src={showTripDetails ? arrowDownIcon : arrowUpIcon}
            alt="toggle arrow"
            style={{ width: "24px", height: "24px" }}
          />
        </div>

        {/* Trip Details heading and horizontal line */}
        <h3 className="fw-bold text-center" style={{ color: textColor }}>
          Trip Details
        </h3>
        <hr style={{ border: "2px solid", borderColor: "black" }} />

        {/* Nearby TODA section with distance in meters */}
        {showTripDetails && nearbyTODAs.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
            }}
          >
            {nearbyTODAs.map((toda, index) => {
              const distMeters = userLocation
                ? Math.round(
                    calculateDistance(
                      userLocation[0],
                      userLocation[1],
                      toda.coordinates[0],
                      toda.coordinates[1]
                    ) * 1000
                  )
                : null;
              return (
                <div
                  key={index}
                  style={{
                    minWidth: "250px",
                    border: `2px solid ${mainBorder}`,
                    borderRadius: "12px",
                    padding: "1rem",
                    backgroundColor: containerBg,
                    color: textColor,
                    flexShrink: 0,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <h6>{toda.name}</h6>
                  <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    {toda.location}
                  </p>
                  <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
                    Coordinates: {toda.coordinates[0].toFixed(6)}°, {toda.coordinates[1].toFixed(6)}°
                  </p>
                  {distMeters !== null && (
                    <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                      Distance: {distMeters} meters
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Rider info */}
        {showTripDetails && (
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
        )}

        {/* Book Ride / Ride Done button */}
        {showTripDetails && (
          !rideDone ? (
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
          )
        )}
      </div>

      {/* Chat Component */}
      {showChat && (
        <div
          className="bookingdetail-chat-override"
          style={{
            position: "fixed",
            top: "80px",
            right: "40px",
            width: "350px",
            zIndex: 3000,
            display: "flex",
            flexDirection: "column",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <ToggleChat
            userName={chatProps.userName}
            userRole={user?.role}
            autoOpen={true}
            floating={false}
            bookingId={tripDetails?.booking_id}
          />
        </div>
      )}
    </MDBContainer>
  );
};
