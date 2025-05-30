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
import {
  muntinlupaLocations,
  calculateDistance,
  calculateFare,
  LocationContext,
  LocationProvider,
  todaLocations,
  findNearbyTODA,
} from "../../contexts/LocationContext.jsx";

const socket = io("http://127.0.0.1:5000");

export const BookingDetail = () => {
  return (
    <LocationProvider>
      <BookingDetailInner />
    </LocationProvider>
  );
};

const BookingDetailInner = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userLocation, findNearbyTODA, defaultLocation } = useContext(LocationContext);

  // New state to keep search input open
  const keepSearchOpen = location.state?.keepSearchOpen || false;
  const hideSearchInput = location.state?.hideSearchInput || false;

  const containerBg = isDark ? "#202124" : "white";
  const textColor = isDark ? "#fff" : "#000";
  const profileIcon = isDark ? userIcon : userWhiteIcon;
  const circleBg = isDark ? "#fff" : "transparent";
  const mainBorder = "#B26D18";

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param) || "";
  };

  // New const for default from location using defaultLocation from context
  // If fromSearch is empty, use defaultLocation label as initial value
  const defaultFromLocationLabel = "Bayanan"; // Updated to match the defaultLocation name in muntinlupaLocations
  const initialFromSearch = getQueryParam("from") || defaultFromLocationLabel;

  const [todaSearch, setTodaSearch] = useState("");
  const [selectedToda, setSelectedToda] = useState(null);
  const [hideTripDetailsContainer, setHideTripDetailsContainer] = useState(false);
  const [hideRiderInfoContainer, setHideRiderInfoContainer] = useState(false);
  const [fromSearch, setFromSearch] = useState(initialFromSearch);
  const [fromDisplayLabel, setFromDisplayLabel] = useState(defaultFromLocationLabel);
  const [toSearch, setToSearch] = useState(getQueryParam("to") || "");
  const [mapCenter, setMapCenter] = useState(defaultLocation);
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [distance, setDistance] = useState(null);
  const [fare, setFare] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [rideDone, setRideDone] = useState(false);
  const [showTripDetails, setShowTripDetails] = useState(true);
  const [tripDetails, setTripDetails] = useState(null);

  // Sync tripDetails.to_location with toSearch state
  useEffect(() => {
    setTripDetails((prev) => ({
      ...prev,
      to_location: toSearch,
    }));
  }, [toSearch]);
  const [showChat, setShowChat] = useState(false);
  const [chatProps, setChatProps] = useState({});
  const [nearbyTODAs, setNearbyTODAs] = useState([]);

  useEffect(() => {
    const locateClicked = localStorage.getItem("locateClicked");
    if (locateClicked === "true") {
      setHideTripDetailsContainer(true);
      setHideRiderInfoContainer(true);
      setShowTripDetails(true);
      localStorage.removeItem("locateClicked");
    }
  }, []);

  // New effect to set hide containers based on keepSearchOpen from BottomNav
  useEffect(() => {
    if (keepSearchOpen) {
      setHideTripDetailsContainer(true);
      setHideRiderInfoContainer(true);
    }
  }, [keepSearchOpen]);

  useEffect(() => {
    if (selectedToda) {
      setHideTripDetailsContainer(false);
      setHideRiderInfoContainer(false);
    }
  }, [selectedToda]);

  // ... rest of code unchanged ...

  // Modify the conditional rendering of the TODA search input and from/to inputs
  // Find the JSX part where the search input is conditionally rendered:
  // Replace {!selectedToda ? ( ... ) : ( ... )} with:
  // {(!selectedToda || keepSearchOpen) ? ( ... ) : ( ... )}

  // I will now locate and edit that JSX part below.

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

    // Listen for accept_booking event to show chat when rider accepts booking in Notif page
    socket.on("accept_booking", (data) => {
      if (data.user_id === user?.user_id) {
        setShowChat(true);
        setChatProps((prev) => ({
          ...prev,
          bookingId: data.booking_id,
          userName: user?.name || "User",
          riderName: data.rider_name || prev.riderName,
        }));
      }
    });

    // Listen for booking_accepted_update event to update rideDone state
    socket.on("booking_accepted_update", (data) => {
      if (data.booking_id === tripDetails?.booking_id) {
        setRideDone(true);
      }
    });

    return () => {
      socket.off("booking_confirmation");
      socket.off("booking_accepted");
      socket.off("booking_accepted_update");
    };
  }, [tripDetails?.booking_id, user?.name]);

  useEffect(() => {
    // Set fromCoords and toCoords based on fromSearch and toSearch when component mounts or when they change
    if (fromSearch) {
      for (const category of Object.values(muntinlupaLocations())) {
        if (category[fromSearch]) {
          setFromCoords(category[fromSearch]);
          setMapCenter(category[fromSearch]);
          break;
        }
      }
    } else {
      setFromCoords(defaultLocation);
      setMapCenter(defaultLocation);
    }
    if (toSearch) {
      for (const category of Object.values(muntinlupaLocations())) {
        if (category[toSearch]) {
          setToCoords(category[toSearch]);
          break;
        }
      }
    }
  }, [fromSearch, toSearch]);

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

  /*
  useEffect(() => {
    if (userLocation && userLocation.length === 2) {
      const nearby = findNearbyTODA(userLocation[0], userLocation[1]);
      setNearbyTODAs(nearby);
      setMapCenter(userLocation);
    }
  }, [userLocation, findNearbyTODA]);
  */

  // Hide geolocation marker if userLocation is defaultLocation
  // const showUserLocationMarker = !(userLocation[0] === defaultLocation[0] && userLocation[1] === defaultLocation[1]);

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

    // Emit ride_done event here to create the table immediately after booking
    socket.emit("ride_done", {
      booking_id: bookingId,
      user_id: user?.user_id,
    });

    socket.emit("create_booking", {
      booking_id: bookingId,
      user_id: user?.user_id,
      role: user?.role,
      from_location: fromSearch,
      to_location: toSearch,
    });

    // Do not reset isBooking here; keep it true until accept_booking event is received
    // setTimeout(() => {
    //   setIsBooking(false);
    // }, 1500);
  };

  // Listen for booking_accepted_update event to reset isBooking and set rideDone
  useEffect(() => {
    const handleBookingAcceptedUpdate = (data) => {
      if (data.booking_id === tripDetails?.booking_id) {
        setRideDone(true);
        setIsBooking(false);
      }
    };
    socket.on("booking_accepted_update", handleBookingAcceptedUpdate);
    return () => {
      socket.off("booking_accepted_update", handleBookingAcceptedUpdate);
    };
  }, [tripDetails?.booking_id]);

  const handleRideDone = async () => {
    try {
      if (!tripDetails?.booking_id || !user?.user_id) {
        alert("Missing booking or user information");
        return;
      }

      // Prepare data for ride history
      const rideHistoryData = {
        user_id: user.user_id,
        rider_id: tripDetails?.user_id || "", // Changed from rider_name to user_id as rider_id
        booking_id: tripDetails.booking_id,
        start_time: new Date().toISOString(), // Use current time or adjust as needed
        end_time: new Date().toISOString(),   // Use current time or adjust as needed
        date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD
        location_from: tripDetails?.from_location || "",
        location_to: tripDetails?.to_location || "",
      };

      // Call backend API to save ride history
      const response = await fetch("http://127.0.0.1:5000/api/ride_history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rideHistoryData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to save ride history: " + errorData.error);
        return;
      }

      // Emit ride_done event with booking_id and user_id
      socket.emit("ride_done", {
        booking_id: tripDetails.booking_id,
        user_id: user.user_id,
      });

      // Navigate to BookingComplete and pass rider info via state
      navigate("/BookingComplete", {
        state: {
          riderInfo: {
            rider_name: tripDetails?.rider_name,
            user_id: tripDetails?.user_id,
          },
        },
      });
    } catch (error) {
      alert("Error saving ride history: " + error.message);
    }
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
        todaMarkers={todaLocations}
        defaultFromLocationLabel={defaultFromLocationLabel}
        onTodaMarkerClick={(toda) => {
          setSelectedToda(toda);
          setTodaSearch(toda.name);
        }}
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
      {(!selectedToda || keepSearchOpen) && !hideSearchInput ? (
        <MDBCol md="12">
          <LocationSearchInput
            value={todaSearch}
            onChange={(e) => {
              setTodaSearch(e.target.value);
              setSelectedToda(null);
            }}
            placeholder="Search TODA Location"
            locations={{
              "TODA Locations": todaLocations.reduce((acc, toda) => {
                acc[toda.name] = toda.coordinates;
                return acc;
              }, {}),
            }}
            onSelect={(location) => {
              const matchedToda = todaLocations.find(
                (toda) => toda.name === location
              );
              if (matchedToda) {
                setSelectedToda(matchedToda);
                setTodaSearch("");
              }
            }}
            isDark={isDark}
            textColor={textColor}
            mainBorder={mainBorder}
            containerBg={containerBg}
          />
        </MDBCol>
      ) : (
          <>
            <MDBCol md="5">
              <LocationSearchInput
                value={fromDisplayLabel}
                onChange={(e) => {
                  setFromDisplayLabel(e.target.value);
                  setFromSearch(e.target.value);
                }}
                placeholder="Current Location"
                locations={muntinlupaLocations()}
                onSelect={(location) => {
                  handleLocationSelect(
                    location,
                    setFromSearch,
                    setFromCoords,
                    "from_location"
                  );
                  setFromDisplayLabel(location);
                }}
                isDark={isDark}
                textColor={textColor}
                mainBorder={mainBorder}
                containerBg={containerBg}
              />
            </MDBCol>
            <MDBCol md="5">
              <LocationSearchInput
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                placeholder="To (e.g., Alabang)"
                locations={muntinlupaLocations()}
                onSelect={(location) =>
                  handleLocationSelect(
                    location,
                    setToSearch,
                    setToCoords,
                    "to_location"
                  )
                }
                isDark={isDark}
                textColor={textColor}
                mainBorder={mainBorder}
                containerBg={containerBg}
              />
            </MDBCol>
            <MDBCol md="2" className="text-center">
              <button
                className="btn btn-sm"
                style={{
                  backgroundColor: containerBg,
                  color: textColor,
                  border: `1px solid ${mainBorder}`,
                }}
                onClick={() => setSelectedToda(null)}
              >
                Change TODA
              </button>
            </MDBCol>
          </>
      )}
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
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = mainBorder)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = containerBg)
          }
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
          {hideTripDetailsContainer ? "TODA Location" : "Trip Details"}
        </h3>
        <hr style={{ border: "2px solid", borderColor: "black" }} />

        {/* Selected TODA section */}
        {showTripDetails && selectedToda && (
          <div
            style={{
              border: `2px solid ${mainBorder}`,
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: containerBg,
              color: textColor,
            }}
          >
            <h5 className="fw-bold">{selectedToda.name}</h5>
            <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {selectedToda.location}
            </p>
            <p style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
              Coordinates: {selectedToda.coordinates[0].toFixed(6)}°,{" "}
              {selectedToda.coordinates[1].toFixed(6)}°
            </p>
            {fromCoords && (
              <p style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                Distance:{" "}
                {Math.round(
                  calculateDistance(
                    fromCoords[0],
                    fromCoords[1],
                    selectedToda.coordinates[0],
                    selectedToda.coordinates[1]
                  ) * 1000
                )}{" "}
                meters
              </p>
            )}
          </div>
        )}

        {/* Rider info */}
        {!hideTripDetailsContainer && !hideRiderInfoContainer && showTripDetails && !keepSearchOpen && (
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
                From: {tripDetails?.from_location || fromSearch || "—"} To:{" "}
                {tripDetails?.to_location || toSearch || "—"}
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
        {!hideTripDetailsContainer && !hideRiderInfoContainer && showTripDetails && !keepSearchOpen &&
          (!rideDone ? (
            <button
              className="btn btn-success w-100"
              style={{ backgroundColor: mainBorder, border: "none" }}
              onClick={handleBookRide}
              disabled={isBooking}
            >
              {isBooking ? "Finding Rider..." : "Book Ride"}
            </button>
          ) : (
            <button
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#198754", border: "none" }}
              onClick={() => {
                handleRideDone();
                if (tripDetails?.booking_id) {
                  socket.emit("payment_received_signal", {
                    booking_id: tripDetails.booking_id,
                    user_id: user?.user_id,
                  });
                }
              }}
            >
              Pay Now
            </button>
          ))}
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
        onClearBooking={() => {
          console.log("onClearBooking called: clearing tripDetails and chat state");
          setTripDetails(null);
          setShowChat(false);
          setChatProps({});
        }}
      />
        </div>
      )}
    </MDBContainer>
  );
};
