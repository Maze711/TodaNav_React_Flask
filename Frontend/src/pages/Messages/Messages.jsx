import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import { useState, useEffect, useContext } from "react";
import { ToggleChat } from "../../Components/ToggleChat";
import { UserContext } from "../../App";

export const Messages = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/messages?user_id=" + user?.user_id)
      .then((res) => res.json())
      .then(async (data) => {
        const messagesWithNames = await Promise.all(
          data.map(async (msg) => {
            const res = await fetch(
              `http://localhost:5000/api/user/by_userid/${msg.sender_id}`
            );
            const sender = await res.json();
            return {
              ...msg,
              name: sender.name,
            };
          })
        );
        setMessages(messagesWithNames);
      });
  }, [user]);

  const filteredMessages = messages.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
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
        <hr />
        <MDBRow style={{ maxHeight: "440px", overflowY: "auto" }}>
          <ul className="list-unstyled">
            {filteredMessages.map((message) => (
              <li key={message.id} className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <img
                    src={message.rider_img}
                    alt="Avatar"
                    className="rounded-circle"
                    width="50"
                    height="50"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-grow-1">
                  <strong>{message.name}</strong>
                  <p className="mb-0">{message.message_content}</p>
                </div>
                <div className="text-end" style={{ minWidth: "80px" }}>
                  {message.time}
                </div>
              </li>
            ))}
          </ul>
        </MDBRow>
        <div>
          <ToggleChat userName={user?.name || "User"} />
        </div>
        <BottomNav />
      </MDBContainer>
    </>
  );
};
