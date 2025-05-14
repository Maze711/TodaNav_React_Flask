import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

export const ViewChatModal = ({
  isOpen,
  onClose,
  booking_id,
  current_userid,
}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const getChatHistory = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/messages/history/${booking_id}`
        );
        const data = await response.json();

        // Sort messages by timestamp ascending
        const sortedData = data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        setMessages(sortedData);
      } catch (error) {
        console.log("getAllConversations: ", error);
        setMessages([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && booking_id) {
      getChatHistory();
    }
  }, [isOpen, booking_id]);

  return (
    <MDBModal open={isOpen} onClose={onClose} tabIndex="-1">
      <MDBModalDialog centered scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              Chat History (Booking ID: {booking_id.split("_")[1]})
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={onClose}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody
            style={{
              background: "#fff",
              padding: "10px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingBottom: "20px",
            }}
          >
            {(messages.length === 0 &&
              isLoading) && (
                <div
                  style={{ textAlign: "center", marginTop: 20 }}
                >
                  Loading messages...
                </div>
              )}
            {messages.length === 0 ? (
              <div
                style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}
              >
                No messages yet.
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems:
                      msg.user_rider_id === current_userid
                        ? "flex-end"
                        : "flex-start",
                    maxWidth: "80%",
                    alignSelf:
                      msg.user_rider_id === current_userid
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  <div
                    style={{
                      background:
                        msg.user_rider_id === current_userid
                          ? "#007bff"
                          : "#e9ecef",
                      color:
                        msg.user_rider_id === current_userid ? "#fff" : "#333",
                      borderRadius: 16,
                      padding: "6px 12px",
                      fontSize: 15,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      wordBreak: "break-word",
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{msg.name}:</span>{" "}
                    {msg.messages}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#888",
                      marginTop: 2,
                      textAlign:
                        msg.user_rider_id === current_userid ? "right" : "left",
                    }}
                  >
                    {formatDateTime(msg.timestamp)}
                  </div>
                </div>
              ))
            )}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};
