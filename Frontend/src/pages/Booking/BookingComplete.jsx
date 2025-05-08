import React from "react";
import { useTheme } from "../../ThemeContext";
import { MapContainer, TileLayer } from "react-leaflet";
import riderProfile from "../../assets/img/RiderProfile.jpg";
import "leaflet/dist/leaflet.css";

const MAP_CENTER = [14.4167, 121.0333];

export const BookingComplete = () => {
  const { isDark } = useTheme();
  const containerBg = isDark ? "#202124" : "white";
  const textColor = isDark ? "#c9d1d9" : "#000";
  const mainBorder = "#B26D18";

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Non-interactive Map */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <MapContainer
          center={MAP_CENTER}
          zoom={16}
          style={{ width: "100vw", height: "100vh", pointerEvents: "none", filter: isDark ? "grayscale(0.2) brightness(0.7)" : "none" }}
          dragging={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          attributionControl={false}
          keyboard={false}
        >
          <TileLayer
            url={
              isDark
                ? "https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
        </MapContainer>
      </div>

      {/* Modal Trip Details */}
      <div
        className="shadow-5"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          zIndex: 2,
          backgroundColor: containerBg,
          borderRadius: "32px",
          border: `2px solid ${mainBorder}`,
          padding: "4.5rem 3.5rem 3.5rem 3.5rem",
          minWidth: "500px",
          maxWidth: "98vw",
          width: "650px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        {/* Profile Image */}
        <div
          style={{
            width: "220px",
            height: "220px",
            margin: "0 auto",
            marginTop: "-140px",
            marginBottom: "2rem",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={riderProfile}
            alt="Rider"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        {/* Rider Name */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            color: textColor,
            marginBottom: "0.7rem",
          }}
        >
          Kurt Dominic Pansib
        </div>
        {/* Stars */}
        <div style={{ marginBottom: "1.2rem" }}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                color: "#FFD600",
                fontSize: "2.7rem",
                margin: "0 0.12rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.10)",
              }}
            >
              ★
            </span>
          ))}
        </div>
        {/* Prompt */}
        <div
          style={{
            fontWeight: "bold",
            color: textColor,
            fontSize: "1.25rem",
            marginBottom: "2.2rem",
          }}
        >
          Trip Done? Rate The Service
        </div>
        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            justifyContent: "center",
            marginTop: "2.2rem",
          }}
        >
          <button
            className="btn"
            style={{
              background: mainBorder,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "2rem",
              padding: "1.1rem 3.2rem",
              fontSize: "1.25rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Feedback
            <span role="img" aria-label="edit">
              📝
            </span>
          </button>
          <button
            className="btn"
            style={{
              background: mainBorder,
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "2rem",
              padding: "1.1rem 3.2rem",
              fontSize: "1.25rem",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            Report Rider
            <span role="img" aria-label="warning">
              ⚠️
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};