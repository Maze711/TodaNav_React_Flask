import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";

export const Notif = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <h1>Notification Page</h1>
          {/* Add your notification content here */}
        </MDBCol>
      </MDBRow>
      {/* Render the BottomNav component */}
      <BottomNav />
    </MDBContainer>
  );
};