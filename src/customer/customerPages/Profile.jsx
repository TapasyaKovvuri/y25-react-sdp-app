import React, { useEffect, useState } from "react";
import "../customer.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", phone: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        username: storedUser.username || "",
        email: storedUser.email || "",
        phone: storedUser.phone || ""
      });
    }
  }, []);

  const handleSave = () => {
    // 1. Update the current session user
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // 2. Update the user in the registeredUsers list
    const allUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const updatedUsersList = allUsers.map((u) => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsersList));

    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  if (!user) return <div className="page-content">Loading...</div>;

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>My Profile</h2>
        <p className="subtitle">Manage your personal information and account security.</p>
      </div>

      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-card header-card">
          <div className="avatar-circle">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="header-info">
            <h3>{user.username}</h3>
            <p className="badge">Premium Member</p>
          </div>
          {isEditing ? (
            <button className="save-profile-btn" onClick={handleSave}>Save Changes</button>
          ) : (
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>

        {/* Details Grid */}
        <div className="profile-details-grid">
          <div className="profile-card info-card">
            <h4>Personal Information</h4>
            
            <div className="info-item">
              <label>Full Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.username} 
                  onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
              ) : (
                <p>{user.username}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email Address</label>
              {/* Email is usually kept read-only as it's the unique ID */}
              <p style={{ color: "var(--text-muted)" }}>{user.email} (Primary)</p>
            </div>

            <div className="info-item">
              <label>Contact Number</label>
              {isEditing ? (
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                />
              ) : (
                <p>{user.phone || "Not provided"}</p>
              )}
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