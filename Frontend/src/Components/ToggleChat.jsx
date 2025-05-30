import React, { useState, useEffect, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export const ToggleChat = ({
  userName = "User",
  userRole = "",
  autoOpen = false,
  style = {},
  floating = true,
  bookingId: bookingIdProp = null,
  onClearBooking = () => {},
}) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [rideDone, setRideDone] = useState(false);
  const [paymentReceivedActive, setPaymentReceivedActive] = useState(false);
  const [bookingId, setBookingId] = useState(bookingIdProp);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5000");
    setSocket(newSocket);

    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("payment_received_update", (data) => {
      if (data.booking_id === bookingId) {
        setPaymentReceivedActive(true);
      }
    });

    newSocket.on("clear_booking_chat", (data) => {
      if (data.booking_id === bookingId) {
        setMessages([]);
        setInput("");
        // Optionally reset bookingId or trigger reload logic here if needed
      }
    });

    return () => newSocket.close();
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId) {
      setMessages([]);
      setInput("");
      setPaymentReceivedActive(false);
    }
  }, [bookingId]);

  useEffect(() => {
    setBookingId(bookingIdProp);
  }, [bookingIdProp]);

  useEffect(() => {
    if (socket && bookingId) {
      socket.emit("join_room", { booking_id: bookingId });
    }
  }, [bookingId, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!bookingId) {
      alert("Booking ID is not set yet. Please wait until booking is confirmed.");
      return;
    }
    if (input.trim() && socket && !paymentReceivedActive) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      console.log(`Booking ID: ${bookingId}, User ID: ${user?.user_id}, Message: ${input}, Timestamp: ${timestamp}`);
      const msg = {
        user: userName,
        content: input,
        time: timestamp,
        booking_id: bookingId,
        user_id: user?.user_id,
        rider_id: userRole?.toLowerCase() === "rider" ? user?.user_id : null,
      };
      socket.emit("message", msg);
      // Removed optimistic local add to prevent duplicate messages
      setInput("");
    }
  };

  const handlePaymentReceivedClick = () => {
    if (socket && bookingId) {
      socket.emit("clear_booking_chat", { booking_id: bookingId });
      setPaymentReceivedActive(false);
      setMessages([]);
      setInput("");
      setBookingId(null);
      onClearBooking();
      // Optionally reset bookingId or trigger reload logic here if needed
    }
  };

  const handleRideDone = () => {
    setRideDone(true);
    if (socket && bookingId) {
      socket.emit("ride_done", { booking_id: bookingId, user_id: user?.user_id });
    }
  };

  if (!open) {
    return (
      <button
        style={{
          margin: "16px 0",
          padding: "10px 32px",
          borderRadius: "24px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          fontSize: 18,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
        }}
        onClick={() => setOpen(true)}
      >
        💬 Open Chat
      </button>
    );
  }

  return (
    <div
      className={floating ? "togglechat-floating" : "togglechat-inline"}
      style={{
        width: "100%",
        height: "100%",
        ...style
      }}
    >
      <div
        style={
          floating
            ? {
                position: "fixed",
                left: "50%",
                transform: "translateX(-50%)",
                width: "90vw",
                maxWidth: 900,
                minWidth: 320,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                display: "flex",
                flexDirection: "column",
                zIndex: 2000,
                minHeight: 120,
              }
            : {
                width: "100%",
                height: "100%",
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: 20,
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                display: "flex",
                flexDirection: "column",
                minHeight: 120,
              }
        }
      >
        <div style={{
          padding: "10px 20px",
          borderBottom: "1px solid #e0e0e0",
          background: "#f8f9fa",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          fontWeight: 600,
          fontSize: 18,
          color: "#333",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          Chat with Rider {bookingId && <span style={{ fontWeight: 'normal', fontSize: 14, marginLeft: 8 }}> (Booking ID: {bookingId})</span>}
          <button
            onClick={() => setOpen(false)}
            style={{
              border: "none",
              background: "none",
              fontSize: 22,
              color: "#888",
              cursor: "pointer",
              marginLeft: 8
            }}
            title="Close"
          >
            ✖
          </button>
        </div>
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 20px",
          background: "#fff",
          minHeight: 60,
          maxHeight: 180,
          display: "flex",
          flexDirection: "column"
        }}>
          {messages.length === 0 && (
            <div style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}>No messages yet.</div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 10,
                alignSelf: msg.user === userName ? "flex-end" : "flex-start",
                maxWidth: "80%",
              }}
            >
              <div
                style={{
                  background: msg.user === userName ? "#007bff" : "#e9ecef",
                  color: msg.user === userName ? "#fff" : "#333",
                  borderRadius: 16,
                  padding: "6px 12px",
                  fontSize: 15,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  wordBreak: "break-word",
                }}
              >
                <span style={{ fontWeight: 500 }}>{msg.user}:</span> {msg.content}
              </div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2, textAlign: msg.user === userName ? "right" : "left" }}>
                {msg.time}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={{
          display: "flex",
          borderTop: "1px solid #e0e0e0",
          background: "#f8f9fa",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          padding: "10px 16px",
          flexDirection: "column",
          gap: "8px"
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: "8px 14px",
              fontSize: 15,
              outline: "none",
              marginBottom: 8,
              background: "#fff"
            }}
            disabled={paymentReceivedActive}
          />
          <button
            onClick={sendMessage}
            style={{
              padding: "8px 22px",
              borderRadius: 20,
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              cursor: paymentReceivedActive ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
            disabled={paymentReceivedActive}
          >
            Send
          </button>
          {userRole?.toLowerCase() === "rider" && bookingId && (
            <button
              onClick={handlePaymentReceivedClick}
              disabled={!paymentReceivedActive}
              style={{
                padding: "8px 22px",
                borderRadius: 20,
                border: "none",
                background: paymentReceivedActive ? "green" : "gray",
                color: "#fff",
                fontWeight: 600,
                fontSize: 15,
                cursor: paymentReceivedActive ? "pointer" : "not-allowed",
                transition: "background 0.2s"
              }}
            >
              Payment Received
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
