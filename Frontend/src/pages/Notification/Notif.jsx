import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import userIcon from "../../assets/ico/user.png";

export const Notif = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      sender: "System",
      message: "Your trip has been completed successfully. You ...",
      time: "1:15 pm",
    },
    {
      id: 2,
      sender: "System",
      message: "Your driver will arrive shortly.",
      time: "1:05 pm",
    },
    {
      id: 3,
      sender: "Toda Nav News",
      message: "ROAD ACCIDENT. A trailer truck loaded with soft ...",
      time: "8:00 am",
    },
    {
      id: 4,
      sender: "Toda Nav News",
      message: "ROAD ACCIDENT. A trailer truck loaded with soft ...",
      time: "7:38 am",
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    return notif.sender === filter;
  });

  const searchedNotifications = filteredNotifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MDBContainer className="overflow-hidden">
      <MDBRow className="align-items-center my-3">
        <MDBCol md="4">
          <h1>Notifications</h1>
        </MDBCol>
        <MDBCol md="6">
          <MDBInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </MDBCol>
      </MDBRow>
      <div className="d-flex gap-2 mb-3">
        <button
          type="button"
          style={{
            backgroundColor: filter === "all" ? "#0d6efd" : "#f8f9fa",
            color: filter === "all" ? "#fff" : "#000",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          onClick={() => setFilter("all")}
          className="filter-btn"
        >
          All
        </button>
        <button
          type="button"
          style={{
            backgroundColor: filter === "System" ? "#0d6efd" : "#f8f9fa",
            color: filter === "System" ? "#fff" : "#000",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          onClick={() => setFilter("System")}
          className="filter-btn system-btn"
        >
          System
        </button>
        <button
          type="button"
          style={{
            backgroundColor: filter === "Toda Nav News" ? "#0d6efd" : "#f8f9fa",
            color: filter === "Toda Nav News" ? "#fff" : "#000",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          onClick={() => setFilter("Toda Nav News")}
          className="filter-btn toda-nav-btn"
        >
          Toda Nav News
        </button>
      </div>
      <hr />
      <MDBRow style={{ maxHeight: "440px", overflowY: "auto" }}>
        <MDBCol>
          <ul className="list-unstyled">
            {searchedNotifications.map((notif) => (
              <li key={notif.id} className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <img
                    src={userIcon}
                    alt="Avatar"
                    className="rounded-circle"
                    width="50"
                    height="50"
                  />
                </div>
                <div className="flex-grow-1">
                  <strong className="notif-sender">{notif.sender}</strong>
                  <p className="mb-0 notif-message">{notif.message}</p>
                </div>
                <div
                  className="text-end notif-time"
                  style={{ minWidth: "80px" }}
                >
                  {notif.time}
                </div>
              </li>
            ))}
          </ul>
        </MDBCol>
      </MDBRow>
      <BottomNav />
    </MDBContainer>
  );
};