import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { BottomNav } from "../../Components/BottomNav";
import defaultProfile from "../../assets/img/default_profile.jpg";

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
  const [profilePreview, setProfilePreview] = useState(null);
  const [originalProfilePreview, setOriginalProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    contact_no: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = await (user?.user_id || getUserId());
        if (!userId) throw new Error("User not found!");

        // Fetch users details & profile image in parallel
        const [userResponse, imageResponse] = await Promise.all([
          fetch(`http://localhost:5000/api/user/by_userid/${userId}`),
          fetch(`http://localhost:5000/api/user/profile_image/${userId}`),
        ]);

        if (!userResponse.ok) throw new Error("Failed to fetch user data");

        const user_data = await userResponse.json();
        const { name, contact_no } = user_data;

        setEditForm({
          name: name || "",
          contact_no: contact_no || "",
        });

        // set the profile states, only if the user has image
        if (imageResponse.ok) {
          const imageBlob = await imageResponse.blob();
          const imageUrl = URL.createObjectURL(imageBlob); // Converts image to url

          setOriginalProfilePreview(imageUrl);
          setProfilePreview(imageUrl);
        }
      } catch (error) {
        console.log("getUserData Error:", error);
        toast.error(error.message || "An error occurred");
      }
    };

    getUserData();
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

    // Reset the Profile Preview
    setProfilePreview(originalProfilePreview); 
    setProfileFile(null);
  };

  const handleLogout = () => {
    const isLoggedOut = confirm("Are you sure you want to log out?");
    if (!isLoggedOut) return;

    // Clears any user-related data
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");

    // Redirect back to login page
    navigate("/");
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    // Store the file for later upload
    setProfileFile(file);

    // Preview Image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // Resize image before upload
  const compressImage = (file) => {
    return new Promise((resolve) => {
      // Creates and set image in memory
      const img = new Image();
      img.src = URL.createObjectURL(file);

      // Processes the image compression
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = 512;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Converts compressed/scaled image into blob object
        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
          },
          file.type,
          0.8
        );
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const isSaved = confirm("Are you sure you want to save the changes?");

    if (!isSaved) return;

    const userId = user?.user_id || getUserId();
    if (!userId) return;

    // Prepares the data to be send to api
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("contact_no", editForm.contact_no);

    // Add the profile image file if a new one was selected
    if (profileFile) {
      const compressedFile = await compressImage(profileFile);
      formData.append("profile_img", compressedFile);
    }

    try {
      // Update the user profile
      const response = await fetch(
        `http://localhost:5000/api/user/update/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setUser({
          ...user,
          name: data.name,
          contact_no: data.contact_no,
          user_profile: data.user_profile,
        });
        setIsEditing(false);
        setProfileFile(null);
      } else {
        toast.error(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

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
              src={profilePreview || defaultProfile}
              width="150"
              height="150"
              style={{ objectFit: "cover", marginLeft: "30px" }}
              alt="User profile"
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
                  alt="Camera icon"
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
              <p className="m-0">
                {user ? user.contact_no || "No contact no.#" : "Loading..."}
              </p>
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
                alt="Edit icon"
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
          <img src={icon.globe} width="80" height="80" alt="Globe icon" />
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
                alt="Arrow right icon"
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
                alt="Arrow right icon"
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
                alt="Arrow right icon"
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
                alt="Arrow right icon"
              />
            </button>
          </div>
        </MDBCol>
      </MDBRow>
      <BottomNav />
    </MDBContainer>
  );
};
