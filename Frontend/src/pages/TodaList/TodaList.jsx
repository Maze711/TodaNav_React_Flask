import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useTheme } from "../../ThemeContext";
import userIcon from "../../assets/ico/user.png";
import userIconWhite from "../../assets/ico/user-white.png";
import { BottomNav } from "../../Components/BottomNav";

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

  const tricycles = [
    {
      riderName: "Juan Dela Cruz",
      plateNumber: "ABC-1234",
      status: "Available",
      passengers: 0,
      maxPassengers: 4,
    },
    {
      riderName: "Pedro Santos",
      plateNumber: "XYZ-5678",
      status: "On The Road",
      passengers: 2,
      maxPassengers: 4,
    },
    {
      riderName: "Maria Clara",
      plateNumber: "DEF-9012",
      status: "Full",
      passengers: 4,
      maxPassengers: 4,
    },
    {
      riderName: "Jose Rizal",
      plateNumber: "GHI-3456",
      status: "Not Available",
      passengers: 0,
      maxPassengers: 4,
    },
    {
      riderName: "Ana Santos",
      plateNumber: "JKL-7890",
      status: "Available",
      passengers: 1,
      maxPassengers: 4,
    },
    {
      riderName: "Carlos Garcia",
      plateNumber: "MNO-2345",
      status: "On The Road",
      passengers: 3,
      maxPassengers: 4,
    },
    {
      riderName: "Liza Reyes",
      plateNumber: "PQR-6789",
      status: "Full",
      passengers: 4,
      maxPassengers: 4,
    },
    {
      riderName: "Mark Lopez",
      plateNumber: "STU-0123",
      status: "Not Available",
      passengers: 0,
      maxPassengers: 4,
    },
  ];

  const filteredTricycles = tricycles.filter((t) => {
    const matchesSearch =
      t.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = false;
    if (activeFilter === "ALL") {
      matchesFilter = true;
    } else if (activeFilter === "In TODA Waiting") {
      matchesFilter = t.status === "Available" || t.status === "In TODA Waiting";
    } else {
      matchesFilter = t.status === activeFilter;
    }
    return matchesSearch && matchesFilter;
  });

  return (
    <MDBContainer className="py-3" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "0 0 auto", position: "sticky", top: 0, backgroundColor: isDark ? "#222" : "#fff"}}>
        <MDBRow className="mb-3">
          <MDBCol size="12" md="auto" className="d-flex align-items-center">
            <h2 style={titleStyle}>See Available Tricycle</h2>
          </MDBCol>
          <MDBCol size="12" md className="mt-2 mt-md-0">
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
      </div>
      <div style={{ flex: "1 1 auto", overflowY: "auto", paddingBottom: "60px" }}>
        {filteredTricycles.length === 0 ? (
          <p>No tricycles found.</p>
        ) : (
          <MDBRow>
            {filteredTricycles.map((t, index) => (
              <MDBCol key={index} size="12" md="6" className="mb-3 d-flex">
                <div
                style={{
                  border: `1px solid ${isDark ? "#fff" : "#222"}`,
                  borderRadius: "8px",
                  padding: "1rem",
                  backgroundColor: isDark ? "#333" : "#f9f9f9",
                  minHeight: 180,
                  boxShadow: isDark ? "0 4px 8px rgba(255, 255, 255, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  // Remove justifyContent to align content at top
                  flexGrow: 1,
                }}
                >
                  <p style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                    <img
                      src={isDark ? userIconWhite : userIcon}
                      alt="User Icon"
                      style={{ width: 56, height: 56, marginRight: 16, borderRadius: "50%" }}
                    />
                    <strong>Rider's Name:</strong> {t.riderName}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>Plate Number:</strong> {t.plateNumber}
                  </p>
                  <p style={{ marginBottom: 8 }}>
                    <strong>Status:</strong> {t.status}
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <strong>Passengers:</strong> {t.passengers}/{t.maxPassengers} Passengers
                  </p>
                </div>
              </MDBCol>
            ))}
          </MDBRow>
        )}
      </div>
      <BottomNav />
    </MDBContainer>
  );
}; 