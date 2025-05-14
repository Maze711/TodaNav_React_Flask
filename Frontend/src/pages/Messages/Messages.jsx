import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import { useState, useEffect, useContext } from "react";
import { ToggleChat } from "../../Components/ToggleChat";
import { UserContext } from "../../App";
import { io } from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import defaultProfile from "../../assets/img/default_profile.jpg";
import { ViewChatModal } from "../../Components/ViewChatModal";

export const Messages = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showViewChat, setShowViewChat] = useState(false);
  const [viewBookingId, setViewBookingId] = useState("");

  const getUserId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        return parsed.user_id;
      } catch {
        return null;
      }
    }
    return null;
  };

  const formatDateTime = (rawTimestamp) => {
    // Formats the fetched time stamp (e.g. Wed, May 14, 2025 at 12:59 PM)
    const dateObj = new Date(rawTimestamp);

    const formattedDay = dateObj.toLocaleDateString("en-US", {
      weekday: "short",
    });
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDay}, ${formattedDate} at ${formattedTime}`;
  };

  useEffect(() => {
    const getAllConversations = async () => {
      try {
        setIsLoading(true);

        const userId = await (user?.user_id || getUserId());
        if (!userId) throw new Error("User not found!");

        const response = await fetch(
          `http://localhost:5000/api/messages/conversations/${userId}`
        );
        const data = await response.json();

        console.log("data: ", data);
        setMessages(data);
      } catch (error) {
        console.log("getAllConversations: ", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    getAllConversations();
  }, []);

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (!user) return;
    const socket = io("http://127.0.0.1:5000", { query: { role: user.role } });

    // Set bookingId from navigation state if available
    if (location.state && location.state.bookingId) {
      setBookingId(location.state.bookingId);
      setShowChat(true);
    }

    socket.on("booking_accepted", (data) => {
      if (data.user_id === user.user_id) {
        setBookingId(data.booking_id);
        setShowChat(true);
      }
    });

    socket.on("ride_done", (data) => {
      if (data.user_id === user.user_id) {
        navigate("/BookingComplete");
      }
    });

    return () => {
      socket.off("booking_accepted");
      socket.off("ride_done");
      socket.disconnect();
    };
  }, [user, navigate, location]);

  const handleViewChat = (booking_id) => {
    setShowViewChat(true);
    setViewBookingId(booking_id);
  };

  const handleChatClose = () => {
    setShowViewChat(false);
    setViewBookingId("");
  };

  return (
    <>
      <ViewChatModal
        isOpen={showViewChat}
        onClose={() => setShowViewChat(false)}
        booking_id={viewBookingId}
        current_userid={user.user_id}
      />

      <MDBContainer className="overflow-hidden">
        <MDBRow className="align-items-center my-3">
          <MDBCol md="4">
            <h1>Messages</h1>
          </MDBCol>
          <MDBCol md="6">
            <MDBInput
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <hr className="mb-0" />
        <MDBRow>
          <MDBCol>
            <div>
              <ToggleChat
                userName={user?.name || "User"}
                userRole={user?.role || ""}
                bookingId={bookingId}
                autoOpen={showChat}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{ maxHeight: "330px", overflowY: "auto" }}>
          <ul className="list-unstyled">
            {isLoading && <p className="text-center">Loading Messages...</p>}
            {filteredMessages.length === 0 && !isLoading ? (
              // Show this if there's no messages found
              <div
                style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}
              >
                No messages found.
              </div>
            ): filteredMessages.map((message, index) => (
              <li
                key={index}
                className="rounded d-flex align-items-center p-3"
                style={{
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "rgba(128, 128, 128, 0.42)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
                onClick={() => handleViewChat(message.Booking_ID)}
              >
                <div className="me-3">
                  <img
                    src={defaultProfile}
                    alt="Avatar"
                    className="rounded-circle"
                    height="65"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-grow-1">
                  <h6>Booking ID: {message.Booking_ID.split("_")[1]}</h6>
                  <strong>{message.name}</strong>
                  <p className="mb-0">{message.First_Message}</p>
                </div>
                <div className="text-end" style={{ minWidth: "80px" }}>
                  {formatDateTime(message.Timestamp)}
                </div>
              </li>
            ))}
          </ul>
        </MDBRow>
        <BottomNav />
      </MDBContainer>
    </>
  );
};
