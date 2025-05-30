import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import tricycleIcon from "../../assets/ico/tricycle.png";
import tricycleWhiteIcon from "../../assets/ico/tricycle-white.png";
import userIcon from "../../assets/ico/user.png";
import tripHistoryWhiteIcon from "../../assets/ico/trip-history-white.png";
import tripHistoryBlackIcon from "../../assets/ico/trip-history-black.png";
import News1 from "../../assets/img/News1.jpg";
import News2 from "../../assets/img/BgforBooking.jpg";
import { useTheme } from "../../ThemeContext";
import { LocationSearchInput } from "../../Components/LeafLetComponents/LocationSearch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { muntinlupaLocations } from "../../contexts/LocationContext.jsx";
import { UserContext } from "../../App";

export const Home = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // State for search input and selected location
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Use real locations
  const locations = muntinlupaLocations();

  const mainBorder = isDark ? "#fff" : "#222";
  const containerBg = isDark ? "#222" : "#fff";
  const textColor = isDark ? "#fff" : "#222";

  const handleSearchChange = (e) => setSearchValue(e.target.value);

  const handleSelect = (location) => {
    setSelectedLocation(location);
    setSearchValue(location);
    navigate(`/BookingDetail?from=${encodeURIComponent(location)}`);
  };

  const routeToAccount = () => {
    navigate("/Account");
  };

  const routeToTodaList = () => {
    navigate("/TodaList");
  };

  const routeToBooking = () => {
    navigate("/Booking");
  };

  // Pass state to Booking to hide search input
  const routeToBookingWithHideSearch = () => {
    navigate("/Booking", { state: { hideSearchInput: true } });
  };

  const routeToTripHistory = () => {
    navigate("/TripHistory");
  };

  const news_list = [
    {
      id: 1,
      img: News1,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
    {
      id: 2,
      img: News2,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
    {
      id: 3,
      img: News1,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
    {
      id: 4,
      img: News2,
      type: "ROAD ACCIDENT",
      content:
        "A trailer truck loaded with soft drink bottles overturns while approaching the South Luzon Expressway through Susana Heights exit in Muntinlupa City on Sunday (Dec. 13, 2020). A traffic enforcer said no was hurt in the road accident.  (PNA photo by Avito C. Dalan)",
    },
  ];

  return (
    <MDBContainer className="overflow-hidden">
      {/* Header Nav */}
      <MDBRow className="align-items-center my-3 mb-1">
        <MDBCol md="3">
          <h1>TODA NAV</h1>
        </MDBCol>
        <MDBCol md="6">
          <LocationSearchInput
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search Places"
            locations={locations}
            onSelect={handleSelect}
            isDark={isDark}
            textColor={textColor}
          />
        </MDBCol>
        <MDBCol md="3" className="d-flex gap-3">
          {user.role == "USER" && (
            <button
              className={`btn ${isDark && "bg-white"}`}
              onClick={routeToTodaList}
            >
              <img
                src={isDark ? tricycleWhiteIcon : tricycleIcon}
                height={50}
                width={50}
              />
            </button>
          )}

          <button
            className={`btn ${isDark && "bg-white"}`}
            onClick={routeToAccount}
          >
            <img src={userIcon} height={50} width={50} />
          </button>
          <button
            className={`btn ${isDark && "bg-white"}`}
            onClick={() => navigate("/TripHistory")}
          >
            <img
              src={isDark ? tripHistoryWhiteIcon : tripHistoryBlackIcon}
              height={50}
              width={50}
              alt="Trip History"
            />
          </button>
        </MDBCol>
      </MDBRow>

      {user.role == "USER" && (
        <button
          type="button"
          className="btn p-3 mb-3"
          style={{ backgroundColor: "#b26d18" }}
          onClick={routeToBookingWithHideSearch}
        >
          <strong>Start Booking Now</strong>
        </button>
      )}

      {/* News Section */}
      <h4>LATEST NEWS</h4>
      <div
        className="d-flex overflow-auto px-1"
        style={{
          gap: "20px",
        }}
      >
        {news_list.map((news) => (
          <div
            key={news.id}
            className="p-2"
            style={{
              flex: "0 0 auto",
              maxWidth: "400px",
            }}
          >
            <img
              className="rounded-5 w-100"
              src={news.img}
              alt={`News ${news.id}`}
              style={{ objectFit: "cover", height: "180px" }}
            />
            <p className="mt-2 small" style={{ textAlign: "justify" }}>
              <strong>{news.type}:</strong> {news.content}
            </p>
          </div>
        ))}
      </div>
      <BottomNav />
    </MDBContainer>
  );
};
