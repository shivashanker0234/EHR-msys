import React, { useState } from "react";
import "./PatientProfile.css";

function PatientProfile() {
  const initialUserData = {
    username: "Vijay Venkatachalam",
    email: "vjvenkat2590@gmail.com",
    password: "******",
    createdDate: "22/01/2024",
    modifiedDate: "22/01/2024",
    role: "Patient",
    is_active: true,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="patient-container">
      <div className="profile-title">
        <h2 className="profile-h2">Profile</h2>
      </div>
      <div className="profile-form">
        <div className="profile-header">
          <button
            className="edit-button"
            onClick={isEditing ? handleSaveClick : handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
        {isEditing ? (
          <form className="edit-form">
            <div className="form-group">
              <label>User Name:</label>
              <input
                className="form-input"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                className="form-input"
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                className="form-input"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-item ">
              <h2 className="profile-name">
                {userData.username}{" "}
                {userData.is_active && (
                  <span className="badge badge-success">Active</span>
                )}
              </h2>
            </div>
            <div className="detail-item">
              <strong>Role </strong> {userData.role}
            </div>
            <div className="detail-item">
              <strong>Email </strong> {userData.email}
            </div>
            <div className="detail-item ">
              <strong>Password </strong> ********
            </div>
            <div className="detail-item">
              <strong>Created Date </strong> {userData.createdDate}
            </div>
            <div className="detail-item">
              <strong>Modified Date </strong> {userData.modifiedDate}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;
