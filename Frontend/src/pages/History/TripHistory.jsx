import React, { useState, useEffect, useContext } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTheme } from "../../ThemeContext";
import { UserContext } from "../../App";
import { BottomNav } from "../../Components/BottomNav";

export const TripHistory = () => {
  const { isDark } = useTheme();
  const { user } = useContext(UserContext);
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("User object in TripHistory:", user);
    if (!user || (!user.id && !user.user_id)) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
    const fetchRideHistory = async () => {
      try {
        let response;
        if (user.role === 'RIDER') {
          // For rider role, use rider endpoint with user_id or id as rider_id
          const riderId = user.user_id || user.id;
          response = await fetch(`/api/ride_history/rider/${riderId}`);
        } else {
          // For other roles, use user_id or id
          const userId = user.user_id || user.id;
          response = await fetch(`/api/ride_history/${userId}`);
        }
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch ride history");
        }
        const data = await response.json();
        setRideHistory(data.ride_history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRideHistory();
  }, [user]);

  const containerStyle = {
    backgroundColor: isDark ? "#333" : "#f9f9f9",
    color: isDark ? "#fff" : "#222",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: isDark
      ? "0 4px 8px rgba(255, 255, 255, 0.1)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <MDBContainer className="py-3" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem", color: isDark ? "#fff" : "#222" }}>
        Trip History
      </h2>
      {loading && <p>Loading ride history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && rideHistory.length === 0 && <p>No ride history found.</p>}
      {!loading && !error && rideHistory.length > 0 && (
        <MDBRow>
          {rideHistory.map((trip) => (
            <MDBCol key={trip.id} size="12" md="6" className="mb-3 d-flex">
              <div style={containerStyle}>
                <p><strong>Booking ID:</strong> {trip.booking_id}</p>
                <p><strong>Date:</strong> {new Date(trip.date).toLocaleDateString()}</p>
                <p><strong>Start Time:</strong> {new Date(trip.start_time).toLocaleTimeString()}</p>
                <p><strong>End Time:</strong> {new Date(trip.end_time).toLocaleTimeString()}</p>
                <p><strong>From:</strong> {trip.location_from}</p>
                <p><strong>To:</strong> {trip.location_to}</p>
              </div>
            </MDBCol>
          ))}
        </MDBRow>
      )}
      <BottomNav />
    </MDBContainer>
  );
};
