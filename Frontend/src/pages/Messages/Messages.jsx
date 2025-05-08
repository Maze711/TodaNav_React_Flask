import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import riderProfile from "../../assets/img/RiderProfile.jpg";
import { useState } from "react";

export const Messages = () => {
const [messages, setMessages] = useState([
    { id: 1, name: "Kurt Dominic Pansib", rider_img: riderProfile, message_content: "Ser san na pu kayu d2 na ko sa pick up point", time: "1:05 pm", },
    { id: 2, name: "Bob Smith", rider_img: riderProfile, message_content: "Can you confirm the meeting time?", time: "11:30 am", },
    { id: 3, name: "Charlie Brown", rider_img: riderProfile, message_content: "Thanks for the update!", time: "10:15 am", },
    { id: 4, name: "Diana Prince", rider_img: riderProfile, message_content: "Looking forward to our call later.", time: "9:00 am", },
    { id: 5, name: "Ethan Hunt", rider_img: riderProfile, message_content: "Mission accomplished. Awaiting further instructions.", time: "8:45 am", },
    { id: 6, name: "Fiona Gallagher", rider_img: riderProfile, message_content: "Can you send me the files by EOD?", time: "8:30 am", },
    { id: 7, name: "George Clooney", rider_img: riderProfile, message_content: "Let's catch up soon!", time: "8:15 am", },
    { id: 8, name: "Hannah Montana", rider_img: riderProfile, message_content: "Don't forget about the party tonight.", time: "8:00 am", },
    { id: 9, name: "Ian Somerhalder", rider_img: riderProfile, message_content: "Thanks for your help earlier.", time: "7:45 am", },
]);

const [search, setSearch] = useState("");

const filteredMessages = messages.filter((message) =>
  message.name.toLowerCase().includes(search.toLowerCase())
);


  return (
    <MDBContainer className="overflow-hidden">
      <MDBRow className="align-items-center my-3">
        <MDBCol md="4">
          <h1>Messages</h1>
        </MDBCol>
        <MDBCol md="6">
          <MDBInput type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
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
                  style={{ objectFit: "cover"}}
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
      <BottomNav />
    </MDBContainer>
  );
};
