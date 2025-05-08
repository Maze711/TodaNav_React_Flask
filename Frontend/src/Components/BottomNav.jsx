import React from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBContainer, MDBNavbarNav } from "mdb-react-ui-kit";
import { useTheme } from "../ThemeContext";

// Black icons
import homeIcon from "../assets/ico/home.png";
import walletIcon from "../assets/ico/wallet.png";
import locateIcon from "../assets/ico/location.png";
import chattingIcon from "../assets/ico/chatting.png";
import notificationIcon from "../assets/ico/notification.png";

// White icons (download these and place them in the same folder)
import homeIconWhite from "../assets/ico/home-white.png";
import walletIconWhite from "../assets/ico/wallet-white.png";
import locateIconWhite from "../assets/ico/location-white.png";
import chattingIconWhite from "../assets/ico/chatting-white.png";
import notificationIconWhite from "../assets/ico/notification-white.png";

export const BottomNav = () => {
  const { isDark } = useTheme();
  
  const icons = {
    home: isDark ? homeIconWhite : homeIcon,
    wallet: isDark ? walletIconWhite : walletIcon,
    locate: isDark ? locateIconWhite : locateIcon,
    chatting: isDark ? chattingIconWhite : chattingIcon,
    notification: isDark ? notificationIconWhite : notificationIcon,
  };

  // Define the text style: black text when dark mode is on.
  const textStyle = { color: isDark ? "black" : "inherit" };

  return (
    <MDBNavbar fixed="bottom" light bgColor="light" className="bottom-nav">
      <MDBContainer fluid>
        <MDBNavbarNav className="d-flex flex-row justify-content-around w-100 align-items-center">
          <li className="nav-item text-center">
            <Link to="/home" className="nav-link">
              <img src={icons.home} alt="Home" className="nav-icon" />
              <div className="nav-text" style={textStyle}>Home</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/payments" className="nav-link">
              <img src={icons.wallet} alt="Payments" className="nav-icon" />
              <div className="nav-text" style={textStyle}>Payments</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/locate" className="nav-link">
              <img src={icons.locate} alt="Locate" className="nav-icon" />
              <div className="nav-text" style={textStyle}>Locate</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/messages" className="nav-link">
              <img src={icons.chatting} alt="Messages" className="nav-icon" />
              <div className="nav-text" style={textStyle}>Messages</div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/Notif" className="nav-link">
              <img src={icons.notification} alt="Notification" className="nav-icon" />
              <div className="nav-text" style={textStyle}>Notification</div>
            </Link>
          </li>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};