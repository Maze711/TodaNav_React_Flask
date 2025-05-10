import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const ToggleChat = ({
  userName = "User",
  autoOpen = false,
  style = {},
  floating = true
}) => {
  const [open, setOpen] = useState(autoOpen);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5000");
    setSocket(newSocket);

    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const msg = {
        user: userName,
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      socket.emit("message", msg);
      setInput("");
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
          Chat with Rider
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
          padding: "10px 16px"
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
              marginRight: 8,
              background: "#fff"
            }}
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
              cursor: "pointer",
              transition: "background 0.2s"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};