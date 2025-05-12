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
import { useState } from "react";
import { useTheme } from "../../../ThemeContext";

export const Users = () => {
  const { isOpen } = useSidebar();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const user_list = [
    {
      id: 1,
      name: "User the Bob",
      email: "bob@gmail.com",
      contact_no: "+639123456789",
    },
    {
      id: 2,
      name: "Alice the Great",
      email: "alice@gmail.com",
      contact_no: "+639987654321",
    },
    {
      id: 3,
      name: "Charlie the Brave",
      email: "charlie@gmail.com",
      contact_no: "+639112233445",
    },
    {
      id: 4,
      name: "Diana the Swift",
      email: "diana@gmail.com",
      contact_no: "+639556677889",
    },
    {
      id: 5,
      name: "Eve the Wise",
      email: "eve@gmail.com",
      contact_no: "+639667788990",
    },
    {
      id: 6,
      name: "Frank the Bold",
      email: "frank@gmail.com",
      contact_no: "+639778899001",
    },
    {
      id: 7,
      name: "Grace the Kind",
      email: "grace@gmail.com",
      contact_no: "+639889900112",
    },
  ];

  const filteredUsers = user_list.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="d-flex">
      <SideNav />
      <div
        className="content-area flex-grow-1 min-vh-100"
        style={{
          marginLeft: isOpen ? "250px" : "89px",
          padding: "20px",
          transition: "margin-left 0.3s",
          backgroundColor: isDark ? "#222" : "#f8f9fa",
        }}
      >
        <MDBContainer fluid>
          <MDBRow md={12} className="mb-2">
            <h1 style={{ color: isDark ? "#fff" : "#000" }}>Users</h1>
          </MDBRow>

          <MDBRow>
            <MDBCol md={5}>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={handleSearch}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  marginBottom: 20,
                  fontSize: 16,
                  borderRadius: 4,
                  border: `1px solid ${isDark ? "#fff" : "#ccc"}`,
                  backgroundColor: isDark ? "#333" : "#fff",
                  color: isDark ? "#fff" : "#000",
                }}
              />
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol md={12}>
              <div
                className="p-3 shadow rounded"
                style={{
                  backgroundColor: isDark ? "#333" : "#fff",
                  border: `1px solid ${isDark ? "#444" : "#ddd"}`,
                }}
              >
                <h3 className="p-1" style={{ color: isDark ? "#fff" : "#000" }}>
                  Top Rating Drivers
                </h3>
                <div
                  style={{
                    maxHeight: "380px",
                    overflowY: "auto",
                  }}
                >
                  <MDBTable hover color={isDark ? "dark" : "light"}>
                    <MDBTableHead
                      className="position-sticky top-0"
                      style={{
                        backgroundColor: isDark ? "#333" : "#fff",
                        zIndex: 1,
                      }}
                    >
                      <tr>
                        <th
                          scope="col"
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          colSpan={2}
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          Contact No.#
                        </th>
                        <th
                          scope="col"
                          style={{ color: isDark ? "#fff" : "#000" }}
                        >
                          Action
                        </th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {filteredUsers.map((user, i) => (
                        <tr key={i}>
                          <td style={{ color: isDark ? "#fff" : "#000" }}>
                            {user.id}
                          </td>
                          <td
                            style={{ color: isDark ? "#fff" : "#000" }}
                            colSpan={2}
                          >
                            {user.name}
                          </td>
                          <td style={{ color: isDark ? "#fff" : "#000" }}>
                            {user.email}
                          </td>
                          <td style={{ color: isDark ? "#fff" : "#000" }}>
                            {user.contact_no}
                          </td>
                          <td className="d-flex gap-2">
                            <button
                              className="btn btn-primary"
                              style={{
                                backgroundColor: isDark ? "#007bff" : "#0d6efd",
                                borderColor: isDark ? "#007bff" : "#0d6efd",
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{
                                backgroundColor: isDark ? "#dc3545" : "#dc3545",
                                borderColor: isDark ? "#dc3545" : "#dc3545",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};
