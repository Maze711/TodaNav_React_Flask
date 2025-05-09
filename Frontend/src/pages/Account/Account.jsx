import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import userProfile from "../../assets/img/RiderProfile.jpg";

// Light Mode Icons
import editIcon from "../../assets/ico/edit_light_ico.svg";
import globeIcon from "../../assets/ico/globe.svg";
import arrowRightIcon from "../../assets/ico/arrowright_dark_ico.svg";

// Dark Mode Icons
import editLight from "../../assets/ico/edit_dark_ico.svg";
import globeLight from "../../assets/ico/globe_light.svg";
import arrowRightLight from "../../assets/ico/arrowright_light_ico.svg";

import { useTheme } from "../../ThemeContext";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const getUserId = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      return parsed.user_id || parsed.id;
    } catch {
      return null;
    }
  }
  return null;
};

export const Account = () => {
  const { isDark } = useTheme();
  const [user, setUser] = useState(null);
  const userContext = useContext(UserContext);

  useEffect(() => {
    const userId = userContext?.user_id || userContext?.id || getUserId();
    if (!userId) return;
    fetch(`http://localhost:5000/api/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userContext]);

  const icon = {
    edit: isDark ? editLight : editIcon, 
    globe: isDark ? globeLight: globeIcon,
    arrowRight: isDark ? arrowRightLight: arrowRightIcon,
  }

  return (
    <MDBContainer>
      {/* Header Section*/}
      <MDBRow className="align-items-center my-3">
        <MDBCol md="4">
          <h1>Account</h1>
        </MDBCol>
      </MDBRow>
      <hr className="mb-1" />

      {/* Account Section*/}
      <MDBRow style={{paddingBottom: "100px"}}>
        <MDBCol md="12" className="d-flex gap-5 p-3 align-items-center">
          <img
            className="rounded-circle"
            src={userProfile}
            width="150"
            height="150"
            style={{ objectFit: "cover" }}
          />
          <div className="d-flex flex-column flex-grow-1 justify-content-center">
            <h2 className="m-0">{user ? user.name : "Loading..."}</h2>
            <p className="m-0">{user ? user.email : ""}</p>
            <p className="m-0">+6399142516969</p>
            <p className="m-0">
              <strong>Role:</strong> {userContext?.role || user?.role || "user"}
            </p>
          </div>
          <button
            className={`btn ${isDark? "btn-light" : "btn-dark"} rounded-circle p-0`}
            style={{ width: "50px", height: "50px" }}
          >
            <img
              src={icon.edit}
              width="30"
              height="30"
              style={{ objectFit: "cover" }}
            />
          </button>
        </MDBCol>

        <hr className="mb-1"/>

        <MDBCol className="d-flex align-items-center" style={{marginLeft: "40px"}}>
          <img src={icon.globe} width="80" height="80" />
          <h3 className="fw-bold">Region: Metro Manila</h3>
        </MDBCol>

        <hr className="mb-1"/>

        {/* Buttons Sections */}
        <MDBCol className="py-3 px-5 d-flex flex-column gap-3">
          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">Payment Methods</h3>
            <button className="btn p-0">
              <img
                src={icon.arrowRight}
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">Saved Places</h3>
            <button className="btn p-0">
              <img
                src={icon.arrowRight}
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">Help</h3>
            <button className="btn p-0">
              <img
                src={icon.arrowRight}
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
            </button>
          </div>

          <div className="d-flex justify-content-between">
            <h3 className="fw-bold">Log out</h3>
            <button className="btn p-0">
              <img
                src={icon.arrowRight}
                width="40"
                height="40"
                style={{ objectFit: "cover" }}
              />
            </button>
          </div>
        </MDBCol>
      </MDBRow>
      <BottomNav />
    </MDBContainer>
  );
};