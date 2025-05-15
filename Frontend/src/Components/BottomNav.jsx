import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MDBNavbar, MDBContainer, MDBNavbarNav } from "mdb-react-ui-kit";
import { useTheme } from "../ThemeContext";
import { NotificationContext } from "../contexts/NotificationContext";
import { LocationContext } from "../contexts/LocationContext";
import { UserContext } from "../App";

// Black icons
import homeIcon from "../assets/ico/home.png";
import walletIcon from "../assets/ico/wallet.png";
import locateIcon from "../assets/ico/location.png";
import chattingIcon from "../assets/ico/chatting.png";
import notificationIcon from "../assets/ico/notification.png";

// White icons
import homeIconWhite from "../assets/ico/home-white.png";
import walletIconWhite from "../assets/ico/wallet-white.png";
import locateIconWhite from "../assets/ico/location-white.png";
import chattingIconWhite from "../assets/ico/chatting-white.png";
import notificationIconWhite from "../assets/ico/notification-white.png";

export const BottomNav = () => {
  const { user } = useContext(UserContext);
  const { isDark } = useTheme();
  const { unread, clearUnread } = useContext(NotificationContext);
  const location = useLocation();
  const { fetchUserLocation, updateUserLocation, defaultLocation } = useContext(LocationContext);

  React.useEffect(() => {
    if (location.pathname === "/Notif") clearUnread();
  }, [location, clearUnread]);

  const icons = {
    home: isDark ? homeIconWhite : homeIcon,
    wallet: isDark ? walletIconWhite : walletIcon,
    locate: isDark ? locateIconWhite : locateIcon,
    chatting: isDark ? chattingIconWhite : chattingIcon,
    notification: isDark ? notificationIconWhite : notificationIcon,
  };

  const textStyle = { color: isDark ? "black" : "inherit" };

  const handleLocateClick = () => {
    // Use defaultLocation when Locate is clicked
    updateUserLocation(defaultLocation);
  };

  return (
    <MDBNavbar fixed="bottom" light bgColor="light" className="bottom-nav">
      <MDBContainer fluid>
        <MDBNavbarNav className="d-flex flex-row justify-content-around w-100 align-items-center">
          <li className="nav-item text-center">
            <Link to="/home" className="nav-link">
              <img src={icons.home} alt="Home" className="nav-icon" />
              <div className="nav-text" style={textStyle}>
                Home
              </div>
            </Link>
          </li>
          <li className="nav-item text-center">
            <Link to="/payments" className="nav-link">
              <img src={icons.wallet} alt="Payments" className="nav-icon" />
              <div className="nav-text" style={textStyle}>
                Payments
              </div>
            </Link>
          </li>
          {user.role === "USER" && (
            <li className="nav-item text-center">
              <Link to="/BookingDetail" className="nav-link" onClick={handleLocateClick}>
                <img src={icons.locate} alt="Booking" className="nav-icon" />
                <div className="nav-text" style={textStyle}>
                  Locate
                </div>
              </Link>
            </li>
          )}
          <li className="nav-item text-center">
            <Link to="/messages" className="nav-link">
              <img src={icons.chatting} alt="Messages" className="nav-icon" />
              <div className="nav-text" style={textStyle}>
                Messages
              </div>
            </Link>
          </li>
          <li className="nav-item text-center" style={{ position: "relative" }}>
            <Link to="/Notif" className="nav-link">
              <img src={icons.notification} alt="Notification" className="nav-icon" />
              <div className="nav-text" style={textStyle}>
                Notification
              </div>
              {unread && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 10,
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  !
                </span>
              )}
            </Link>
          </li>
        </MDBNavbarNav>
      </MDBContainer>
    </MDBNavbar>
  );
};
