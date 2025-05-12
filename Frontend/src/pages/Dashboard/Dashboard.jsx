import { SideNav } from "../../Components/SideNav";
import { useSidebar } from "../../contexts/SideBarContext";

export const Dashboard = () => {
  const { isOpen } = useSidebar();

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
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};
