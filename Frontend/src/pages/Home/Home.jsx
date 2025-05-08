import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import locationIcon from "../../assets/ico/location.png";
import userIcon from "../../assets/ico/user.png";
import News1 from "../../assets/img/News1.jpg";
import News2 from "../../assets/img/BgforBooking.jpg";
import { useTheme } from "../../ThemeContext";

export const Home = () => {
  const { isDark } = useTheme()

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
          <MDBInput type="search" placeholder="Search Places" />
        </MDBCol>
        <MDBCol md="3" className="d-flex gap-3">
          <button className={`btn ${isDark && "bg-white"}`}>
            <img src={locationIcon} height={50} width={50} />
          </button>
          <button className={`btn ${isDark && "bg-white"}`}>
            <img src={userIcon} height={50} width={50} />
          </button>
        </MDBCol>
      </MDBRow>

      {/* Start Booking Button Section */}
      <button
        type="button"
        className="btn p-3 mb-3"
        style={{ backgroundColor: "#b26d18" }}
      >
        <strong>Start Booking Now</strong>
      </button>

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
