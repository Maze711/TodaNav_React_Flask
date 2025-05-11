import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTheme } from "../../ThemeContext";

const filterOptions = [
  { label: "ALL", color: "#007bff" },
  { label: "In TODA Waiting", color: "#28a745" },
  { label: "On The Road", color: "#ffc107" },
  { label: "Full", color: "#dc3545" },
  { label: "Not Available", color: "#6c757d" },
];

export const TodaList = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterClick = (label) => {
    setActiveFilter(label);
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "0",
    color: isDark ? "#fff" : "#222",
  };

  const searchBarStyle = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: `1px solid ${isDark ? "#fff" : "#222"}`,
    backgroundColor: isDark ? "#333" : "#fff",
    color: isDark ? "#fff" : "#222",
  };

  const buttonStyle = (color, isActive) => ({
    backgroundColor: color,
    opacity: isActive ? 1 : 0.6,
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "none",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    outline: "none",
    boxShadow: isActive ? `0 0 0 3px rgba(255, 255, 255, 0.7)` : "none",
  });

  return (
    <MDBContainer className="py-3">
      <MDBRow className="align-items-center mb-3" style={{ gap: "1rem" }}>
        <MDBCol size="auto">
          <h2 style={titleStyle}>See Available Tricycle</h2>
        </MDBCol>
        <MDBCol>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={searchBarStyle}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-3">
        {filterOptions.map(({ label, color }) => (
          <MDBCol key={label} size="auto" className="mb-2">
            <button
              style={buttonStyle(color, activeFilter === label)}
              onClick={() => handleFilterClick(label)}
              type="button"
            >
              {label}
            </button>
          </MDBCol>
        ))}
      </MDBRow>
      {/* TODO: Add list of tricycles filtered by searchTerm and activeFilter */}
    </MDBContainer>
  );
};
