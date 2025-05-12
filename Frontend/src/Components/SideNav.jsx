import { useSidebar } from "../contexts/SideBarContext";

import menuRightIco from "../assets/ico/menu_right_ico.svg";
import menuLeftIco from "../assets/ico/menu_left_ico.svg";

// Light icons
import appIco from "../assets/ico/nav_apply_ico.svg";
import dashIco from "../assets/ico/nav_dashboard_ico.svg";
import logoutIco from "../assets/ico/nav_logout_ico.svg";
import newsIco from "../assets/ico/nav_news_ico.svg";
import userIco from "../assets/ico/nav_user_ico.svg";
import notifIco from "../assets/ico/nav_notif_ico.svg";

// Dark icons
import appDarkIco from "../assets/ico/nav_apply_dark_ico.svg";
import dashDarkhIco from "../assets/ico/nav_dashboard_dark_ico.svg";
import logoutDarkIco from "../assets/ico/nav_logout_dark_ico.svg";
import newsDarkIco from "../assets/ico/nav_news_dark_ico.svg";
import userDarkIco from "../assets/ico/nav_user_dark_ico.svg";
import notifDarkIco from "../assets/ico/nav_notif_dark_ico.svg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const SideNav = () => {
  const { isOpen, toggleSidebar, activeIndex, setActiveIndex } = useSidebar();
  const navigate = useNavigate()

  const navItems = [
    {
      icon: activeIndex === 0 ? dashDarkhIco : dashIco,
      label: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: activeIndex === 1 ? userDarkIco : userIco,
      label: "Users",
      route: "/users",
    },
    {
      icon: activeIndex === 2 ? userDarkIco : userIco,
      label: "Drivers",
      route: "/drivers",
    },
    {
      icon: activeIndex === 3 ? newsDarkIco : newsIco,
      label: "News",
      route: "/admin/news",
    },
    {
      icon: activeIndex === 4 ? appDarkIco : appIco,
      label: "Applications",
      route: "/applications",
    },
    {
      icon: activeIndex === 5 ? notifDarkIco : notifIco,
      label: "Notification",
      route: "/notifications",
    },
    { icon: activeIndex === 6 ? logoutDarkIco : logoutIco, label: "Logout" },
  ];

  const handleLogout = () => {
    const isLoggedOut = confirm("Are you sure you want to log out?");
    if (!isLoggedOut) return;

    // Clears any user-related data
    localStorage.removeItem("user");
    localStorage.removeItem("activeIndex");
    toast.success("Logged out successfully!");

    // Redirect back to login page
    navigate("/");
  };

  return (
    <div
      className={"min-vh-100 position-fixed overflow-hidden"}
      style={{
        width: isOpen ? "250px" : "89px",
        backgroundColor: "#343a40",
        transition: "width 0.3s",
      }}
    >
      <div
        className="d-flex w-100 py-4 gap-4 align-items-center"
        style={{ marginLeft: "35px", cursor: "pointer" }}
        onClick={toggleSidebar}
      >
        <img src={isOpen ? menuLeftIco : menuRightIco} height={30} />
        <strong
          className="h3 fw-bold text-white mb-0 overflow-hidden"
          style={{ whiteSpace: "nowrap" }}
        >
          TODA NAV
        </strong>
      </div>

      <ul style={{ paddingLeft: "15px" }}>
        {navItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <Link
              style={{ textDecoration: "none" }}
              to={item.route}
              onClick={item.label === "Logout" ? handleLogout : undefined}
            >
              <li
                className="d-flex align-items-center mb-2 gap-4 fw-bold"
                key={index}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={(e) => {
                  if (!isActive)
                    e.currentTarget.style.backgroundColor = "#495057";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "";
                }}
                style={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px",
                  padding: "15px 20px",
                  transition: "background 0.3s, color 0.3s",
                  backgroundColor: isActive ? "white" : "",
                  color: isActive ? "#343a40" : "white",
                }}
              >
                <img src={item.icon} height={30} />
                {item.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
