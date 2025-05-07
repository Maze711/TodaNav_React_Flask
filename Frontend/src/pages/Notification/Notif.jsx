import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import userIcon from "../../assets/ico/user.png";

export const Notif = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const notifications = [
    { id: 1, sender: "System", message: "Your trip has been completed successfully. You ...", time: "1:15 pm" },
    { id: 2, sender: "System", message: "Your driver will arrive shortly.", time: "1:05 pm" },
    { id: 3, sender: "Toda Nav News", message: "ROAD ACCIDENT. A trailer truck loaded with soft ...", time: "8:00 am" },
    { id: 4, sender: "Toda Nav News", message: "ROAD ACCIDENT. A trailer truck loaded with soft ...", time: "7:38 am" },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    return notif.sender === filter;
  });

  const searchedNotifications = filteredNotifications.filter((notif) =>
    notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MDBContainer>
      <MDBRow className="align-items-center my-3">
        <MDBCol md="6">
          <h1 className="display-5">Notifications</h1>
        </MDBCol>
        <MDBCol md="6" className="d-flex justify-content-end align-items-center">
          <MDBInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="lg"
            className="me-5"
          />
          <div className="d-flex gap-2">
            <MDBBtn
              color={filter === "all" ? "primary" : "light"}
              size="lg"
              onClick={() => setFilter("all")}
              className="filter-btn"
            >
              All
            </MDBBtn>
            <MDBBtn
              color={filter === "System" ? "primary" : "light"}
              size="lg"
              onClick={() => setFilter("System")}
              className="filter-btn system-btn"
            >
              System
            </MDBBtn>
            <MDBBtn
              color={filter === "Toda Nav News" ? "primary" : "light"}
              size="lg"
              onClick={() => setFilter("Toda Nav News")}
              className="filter-btn toda-nav-btn"
            >
              Toda Nav News
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
      <hr />
      <MDBRow>
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
                  <strong>{notif.sender}</strong>
                  <p className="mb-0 text-muted">{notif.message}</p>
                </div>
                <div className="text-end text-muted" style={{ minWidth: "80px" }}>
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