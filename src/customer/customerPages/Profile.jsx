import React, { useEffect, useState } from "react";
import "../customer.css"; // Ensure path is correct!

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>My Profile</h2>
        <p className="subtitle">Manage your personal information and account security.</p>
      </div>

      <div className="profile-container">
        {/* Header Section with Avatar */}
        <div className="profile-card header-card">
          <div className="avatar-circle">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="header-info">
            <h3>{user?.username || "User Name"}</h3>
            <p className="badge">Premium Member</p>
          </div>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>

        {/* Details Grid */}
        <div className="profile-details-grid">
          <div className="profile-card info-card">
            <h4>Personal Information</h4>
            <div className="info-item">
              <label>Full Name</label>
              <p>{user?.username}</p>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Contact Number</label>
              <p>{user?.phone || "+1 234 567 890"}</p>
            </div>
          </div>

          <div className="profile-card info-card">
            <h4>Account Settings</h4>
            <div className="info-item">
              <label>Password</label>
              <p>••••••••••••</p>
            </div>
            <div className="info-item">
              <label>Language</label>
              <p>English (US)</p>
            </div>
            <div className="info-item">
              <label>Timezone</label>
              <p>IST +12:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;