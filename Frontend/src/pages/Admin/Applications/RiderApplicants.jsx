import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { SideNav } from "../../../Components/SideNav";
import { useSidebar } from "../../../contexts/SideBarContext";
import { useTheme } from "../../../ThemeContext";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import userIcon from "../../../assets/ico/user.png";
import userIconWhite from "../../../assets/ico/user-white.png";

const COLORS = ["#0088FE", "#00C49F"];

const newRiderApplicants = [
  {
    id: 1,
    name: "Alice Johnson",
    plateNumber: "ABC-1234",
    phone: "09171234567",
  },
  { id: 2, name: "Bob Smith", plateNumber: "DEF-5678", phone: "09179876543" },
  {
    id: 3,
    name: "Charlie Brown",
    plateNumber: "GHI-9012",
    phone: "09173456789",
  },
  {
    id: 4,
    name: "Diana Prince",
    plateNumber: "JKL-3456",
    phone: "09172345678",
  },
  { id: 5, name: "Ethan Hunt", plateNumber: "MNO-7890", phone: "09171239876" },
];

const tricycles = [
  {
    riderName: "Juan Dela Cruz",
    plateNumber: "ABC-1234",
    phone: "09171234567",
    status: "Available",
    passengers: 0,
    maxPassengers: 4,
  },
  {
    riderName: "Ana Santos",
    plateNumber: "JKL-7890",
    phone: "09179876543",
    status: "Available",
    passengers: 1,
    maxPassengers: 4,
  },
  {
    riderName: "Pedro Santos",
    plateNumber: "XYZ-5678",
    phone: "09173456789",
    status: "On The Road",
    passengers: 2,
    maxPassengers: 4,
  },
  {
    riderName: "Carlos Garcia",
    plateNumber: "MNO-2345",
    phone: "09172345678",
    status: "On The Road",
    passengers: 3,
    maxPassengers: 4,
  },
  {
    riderName: "New Rider 1",
    plateNumber: "NEW-0001",
    phone: "09170000001",
    status: "On The Road",
    passengers: 1,
    maxPassengers: 4,
  },
  {
    riderName: "Maria Clara",
    plateNumber: "DEF-9012",
    phone: "09171234568",
    status: "Full",
    passengers: 4,
    maxPassengers: 4,
  },
  {
    riderName: "Liza Reyes",
    plateNumber: "PQR-6789",
    phone: "09171234569",
    status: "Full",
    passengers: 4,
    maxPassengers: 4,
  },
  {
    riderName: "New Rider 2",
    plateNumber: "NEW-0002",
    phone: "09170000002",
    status: "Full",
    passengers: 4,
    maxPassengers: 4,
  },
  {
    riderName: "New Rider 3",
    plateNumber: "NEW-0003",
    phone: "09170000003",
    status: "Full",
    passengers: 4,
    maxPassengers: 4,
  },
  {
    riderName: "Jose Rizal",
    plateNumber: "GHI-3456",
    phone: "09171234570",
    status: "Not Available",
    passengers: 0,
    maxPassengers: 4,
  },
];

const data = [
  { name: "Applicants", value: newRiderApplicants.length },
  { name: "Accepted", value: tricycles.length },
];

export const RiderApplicants = () => {
  const { isOpen } = useSidebar();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showNewApplicants, setShowNewApplicants] = useState(true);
  const [showAcceptedRiders, setShowAcceptedRiders] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterOptions = [
    { label: "ALL", color: "#007bff" },
    { label: "Available", color: "#28a745" },
    { label: "On The Road", color: "#ffc107" },
    { label: "Full", color: "#dc3545" },
    { label: "Not Available", color: "#6c757d" },
  ];

  const getStatusColor = (status) => {
    const option = filterOptions.find((opt) => opt.label === status);
    return option ? option.color : "#000";
  };

  const filteredApplicants = newRiderApplicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTricycles = tricycles.filter((t) => {
    const matchesSearch =
      t.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.plateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesFilter = false;
    if (activeFilter === "ALL") {
      matchesFilter = true;
    } else {
      matchesFilter = t.status === activeFilter;
    }
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ display: "flex" }}>
      <SideNav />
      <div
        className="content-area flex-grow-1 min-vh-100"
        style={{
          marginLeft: isOpen ? "250px" : "89px",
          padding: "20px",
          transition: "margin-left 0.3s",
        }}
      >
        <MDBContainer
          className="py-3"
          style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
        >
          <h2 style={{ marginBottom: 20 }}>Rider Applicants</h2>
          <input
            type="text"
            placeholder="Search applicants or riders..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: 20,
              fontSize: 16,
              borderRadius: 4,
              border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
              backgroundColor: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000",
            }}
          />
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <h3>New Applicants</h3>
          <div
            style={{
              border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: isDark ? "#333" : "#f9f9f9",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <button
                onClick={() => setShowNewApplicants(!showNewApplicants)}
                style={{
                  backgroundColor: isDark ? "#444" : "#ddd",
                  border: "none",
                  color: isDark ? "#fff" : "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 4,
                  outline: "none",
                }}
                aria-expanded={showNewApplicants}
                aria-controls="new-applicants-container"
              >
                {showNewApplicants ? "Hide" : "Show"}
              </button>
            </div>
            {showNewApplicants && (
              <MDBRow id="new-applicants-container">
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map((applicant) => (
                    <MDBCol
                      key={applicant.id}
                      size="12"
                      md="6"
                      className="mb-3 d-flex"
                    >
                      <div
                        style={{
                          border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
                          borderRadius: "8px",
                          padding: "1rem",
                          backgroundColor: isDark ? "#333" : "#f9f9f9",
                          width: "100%",
                        }}
                      >
                        <p style={{ marginBottom: 8 }}>
                          <strong>Name:</strong> {applicant.name}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                          <strong>Plate No.:</strong> {applicant.plateNumber}
                        </p>
                        <p style={{ marginBottom: 0 }}>
                          <strong>Phone No.:</strong> {applicant.phone}
                        </p>
                      </div>
                    </MDBCol>
                  ))
                ) : (
                  <p>No applicants found.</p>
                )}
              </MDBRow>
            )}
          </div>

          <h3>Accepted Riders</h3>

          <div style={{ marginBottom: 20 }}>
            {filterOptions.map(({ label, color }) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                style={{
                  backgroundColor: color,
                  opacity: activeFilter === label ? 1 : 0.6,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                  textTransform: "none",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  outline: "none",
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            style={{
              border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: isDark ? "#333" : "#f9f9f9",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <button
                onClick={() => setShowAcceptedRiders(!showAcceptedRiders)}
                style={{
                  backgroundColor: isDark ? "#444" : "#ddd",
                  border: "none",
                  color: isDark ? "#fff" : "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: 4,
                  outline: "none",
                }}
                aria-expanded={showAcceptedRiders}
                aria-controls="accepted-riders-container"
              >
                {showAcceptedRiders ? "Hide" : "Show"}
              </button>
            </div>
            {showAcceptedRiders && (
              <MDBRow id="accepted-riders-container">
                {filteredTricycles.length > 0 ? (
                  filteredTricycles.map((t, index) => (
                    <MDBCol
                      key={index}
                      size="12"
                      md="6"
                      className="mb-3 d-flex"
                    >
                      <div
                        style={{
                          border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
                          borderRadius: "8px",
                          padding: "1rem",
                          backgroundColor: isDark ? "#333" : "#f9f9f9",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 12,
                          }}
                        >
                          <img
                            src={isDark ? userIconWhite : userIcon}
                            alt="User Icon"
                            style={{
                              width: 56,
                              height: 56,
                              marginRight: 16,
                              borderRadius: "50%",
                            }}
                          />
                          <strong>Rider's Name:</strong>&nbsp;{t.riderName}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                          <strong>Plate No.:</strong> {t.plateNumber}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                          <strong>Phone No.:</strong> {t.phone}
                        </p>
                        <p style={{ marginBottom: 8 }}>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              color: getStatusColor(t.status),
                              fontWeight: "bold",
                            }}
                          >
                            {t.status}
                          </span>
                        </p>
                        <p style={{ marginBottom: 0 }}>
                          <strong>Passengers:</strong> {t.passengers}/
                          {t.maxPassengers} Passengers
                        </p>
                      </div>
                    </MDBCol>
                  ))
                ) : (
                  <p>No accepted riders found.</p>
                )}
              </MDBRow>
            )}
          </div>
        </MDBContainer>
      </div>
    </div>
  );
};
