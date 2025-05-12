import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { SideNav } from "../../../Components/SideNav";
import { useSidebar } from "../../../contexts/SideBarContext";
import defaultProfile from "../../../assets/img/default_profile.jpg";
import user from "../../../assets/ico/user.png";

export const Dashboard = () => {
  const { isOpen } = useSidebar();

  const stats = [
    { category: "Users", total_count: 200 },
    { category: "Drivers", total_count: 25 },
    { category: "Notifications", total_count: 0 },
    { category: "Applications", total_count: 0 },
  ];

  const topRatingDrivers = [
    { name: "Bok wan", plate_no: "A12345", rating: 4.8 },
    { name: "Jane Doe", plate_no: "B67890", rating: 4.6 },
    { name: "John Smith", plate_no: "C11223", rating: 4.7 },
    { name: "Alice Brown", plate_no: "D44556", rating: 4.5 },
    { name: "Abdul Jabar", plate_no: "E35412", rating: 4.4 },
  ];

  const driversStatus = [
    { category: "Available Drivers", total_count: 8 },
    { category: "Drivers on Trip", total_count: 14 },
  ];
  return (
    <div className="d-flex">
      <SideNav />
      <div
        className="content-area flex-grow-1 min-vh-100"
        style={{
          marginLeft: isOpen ? "250px" : "89px",
          padding: "20px",
          transition: "margin-left 0.3s",
        }}
      >
        <MDBContainer fluid>
          {/* Header Section */}
          <MDBRow className="mb-3">
            <MDBCol md={11}>
              <div className="d-flex justify-content-between align-items-center">
                <h1>Dashboard</h1>
                <div className="d-flex align-items-center justify-content-center gap-3 h-100">
                  <img
                    className="rounded-circle"
                    src={defaultProfile}
                    height={40}
                  />
                  <strong className="h4 mb-0">Admin</strong>
                </div>
              </div>
            </MDBCol>
          </MDBRow>

          {/* Stats Section */}
          <MDBRow className="g-4 mb-4">
            {stats.map((stat, i) => (
              <MDBCol lg={3} key={i}>
                <div className="bg-white shadow rounded-4 d-flex align-items-center gap-3 justify-content-center p-4 stat-card">
                  <div className="d-flex flex-column justify-content-center">
                    <h3 className="text-dark fw-bold mb-1 text-center">
                      {stat.total_count}
                    </h3>
                    <p className="text-muted mb-0 text-center">
                      {stat.category}
                    </p>
                  </div>
                  <img src={user} alt={stat.category} height={50} />
                </div>
              </MDBCol>
            ))}
          </MDBRow>

          {/* Stats with table Section */}
          <MDBRow className="g-4">
            {/* Top Rating Drivers */}
            <MDBCol md={8} className="p-3 shadow bg-white rounded">
              <h3 className="p-1 text-black">Top Rating Drivers</h3>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <MDBTable hover>
                  <MDBTableHead className="position-sticky top-0">
                    <tr>
                      <th scope="col" colSpan={2}>
                        Name
                      </th>
                      <th scope="col">Plate No. #</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {topRatingDrivers.map((topRatingDriver, i) => (
                      <tr key={i}>
                        <td scope="row" colSpan={2}>
                          {topRatingDriver.name}
                        </td>
                        <td>{topRatingDriver.plate_no}</td>
                        <td>{topRatingDriver.rating}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </div>
            </MDBCol>

            <MDBCol md={4} className="d-flex flex-column gap-4">
              {driversStatus.map((driverStat, i) => (
                <div
                  key={i}
                  className="bg-white shadow rounded-4 d-flex flex-grow-1 flex-column align-items-center gap-3 justify-content-center p-4 stat-card"
                >
                  <h1 className="text-dark fw-bold mb-1 text-center">
                    {driverStat.total_count}
                  </h1>
                  <p className="text-muted mb-0 text-center">
                    {driverStat.category}
                  </p>
                </div>
              ))}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};
