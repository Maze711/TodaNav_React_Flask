import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import userImg from "../../assets/img/RiderProfile.jpg";

// Light Mode Icons
import editIcon from "../../assets/ico/edit_light_ico.svg";
import globeIcon from "../../assets/ico/globe.svg";
import arrowRightIcon from "../../assets/ico/arrowright_dark_ico.svg";
import camIcon from "../../assets/ico/camera_light_ico.svg";

// Dark Mode Icons
import editLight from "../../assets/ico/edit_dark_ico.svg";
import globeLight from "../../assets/ico/globe_light.svg";
import arrowRightLight from "../../assets/ico/arrowright_light_ico.svg";
import camLight from "../../assets/ico/camera_dark_ico.svg";

import { useTheme } from "../../ThemeContext";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const getUserId = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      return parsed.user_id;
    } catch {
      return null;
    }
  }
  return null;
};

export const Account = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(userImg);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    contact_no: "",
  });

  useEffect(() => {
    const userId = user?.user_id || getUserId();
    if (!userId) return;
    fetch(`http://localhost:5000/api/user/by_userid/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setEditForm({
          name: data.name || "",
          contact_no: data.contact_no || "",
        });
      });
  }, [user]);

  const icon = {
    edit: isDark ? editLight : editIcon,
    globe: isDark ? globeLight : globeIcon,
    arrowRight: isDark ? arrowRightLight : arrowRightIcon,
    camera: isDark ? camLight : camIcon,
  };

  const handleCancel = () => {
    // Reset the value of the edit form once cancelled
    setIsEditing(false);
    setEditForm({
      name: user.name || "",
      contact_no: user.contact_no || "",
    });
    setUserProfile(userImg); // Reset the profile image to default
  };

  const handleLogout = () => {
    const isLoggedOut = confirm("Are you sure you want to log out?");
    if (!isLoggedOut) return;

    // Clears any user-related data
    localStorage.removeItem("user"); // Remove the user from localStorage
    toast.success("Logged out successfully!");

    // Redirect back to login page
    navigate("/");
  };

  const imgToBlob = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result); // Base64 string
      };    
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      // Convert file (uploaded image) to base64
      reader.readAsDataURL(file); 
    });

  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    imgToBlob(file).then((blob) => {
      setUserProfile(blob);
      console.log(blob);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    })
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const isSaved = confirm("Are you sure you want to save the changes?");

    if (!isSaved) return;

    const userId = user?.user_id || getUserId();
    if (!userId) return;

    try {
      // Update the user profile
      const response = await fetch(`http://localhost:5000/api/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editForm.name,
          contact_no: editForm.contact_no,
          profile_img: userProfile,
        })
      });

      const data = await response.json();
      console.log(data);
      toast.success(data.message);
      setUser({...user, name: data.name, contact_no: data.contact_no}) // Update user context
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile. Please try again.");
      return;
    }
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
      <MDBRow style={{ paddingBottom: "100px" }}>
        <MDBCol md="12" className="d-flex gap-5 p-3 align-items-center">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src={
                userProfile.startsWith("data:image/") ? userProfile : userImg
              }
              width="150"
              height="150"
              style={{ objectFit: "cover", marginLeft: "30px" }}
            />
            {isEditing && (
              <label
                className={`btn ${
                  isDark ? "btn-light" : "btn-dark"
                } rounded-circle p-0 position-absolute d-flex align-items-center justify-content-center`}
                style={{
                  width: "40px",
                  height: "40px",
                  bottom: "5%",
                  right: "3%",
                }}
              >
                <img
                  src={icon.camera}
                  width="20"
                  height="20"
                  style={{ objectFit: "cover" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleProfileChange}
                />
              </label>
            )}
          </div>

          <div className="d-flex flex-column gap-1 flex-grow-1 justify-content-center">
            {!isEditing ? (
              <h2 className="m-0">{user ? user.name : "Loading..."}</h2>
            ) : (
              <MDBInput
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Your name"
              />
            )}
            <p className="m-0">{user ? user.email : ""}</p>
            {!isEditing ? (
              <p className="m-0">{user ? user.contact_no || "No contact no.#" : "Loading..."}</p>
            ) : (
              <MDBInput
                type="tel"
                value={editForm.contact_no}
                onChange={(e) =>
                  setEditForm({ ...editForm, contact_no: e.target.value })
                }
                placeholder="Contact No.# (e.g. +639123456789)"
              />
            )}
            <p className="m-0">
              <strong>Role:</strong> {user?.role || "user"}
            </p>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          {!isEditing ? (
            <button
              className={`btn ${
                isDark ? "btn-light" : "btn-dark"
              } rounded-circle p-0`}
              style={{ width: "50px", height: "50px" }}
              onClick={() => setIsEditing(!isEditing)}
            >
              <img
                src={icon.edit}
                width="30"
                height="30"
                style={{ objectFit: "cover" }}
              />
            </button>
          ) : (
            <div className="d-flex gap-3">
              <button
                className={`btn ${
                  isDark ? "btn-light" : "btn-dark"
                } rounded-3 p-3 fw-bold`}
                style={{ width: "80px" }}
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className={`btn ${
                  isDark ? "btn-success" : "btn-success"
                } rounded-3 p-3 fw-bold`}
                style={{ width: "80px" }}
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </MDBCol>

        <hr className="mb-1" />

        <MDBCol
          className="d-flex align-items-center"
          style={{ marginLeft: "40px" }}
        >
          <img src={icon.globe} width="80" height="80" />
          <h3 className="fw-bold">Region: Metro Manila</h3>
        </MDBCol>

        <hr className="mb-1" />

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
            <button className="btn p-0" onClick={handleLogout}>
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
