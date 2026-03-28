import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./customer.css";

function CustomerSidebar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <div className="customer-sidebar">
      <div className="sidebar-header">
        <h2 className="logo">SUBSAGE</h2>
        {isLoggedIn && <p className="user-badge">Member</p>}
      </div>

      <nav className="sidebar-nav">
        {/* Links shown ALWAYS */}
        <Link to="/plans" className={isActive("/plans")}>View Plans</Link>

        {/* Links shown ONLY when LOGGED IN */}
        {isLoggedIn ? (
          <>
            <Link to="/customer/home" className={isActive("/customer/home")}>My Dashboard</Link>
            <Link to="/customer/subscriptions" className={isActive("/customer/subscriptions")}>Subscriptions</Link>
            <Link to="/customer/history" className={isActive("/customer/history")}>Billing History</Link>
            <Link to="/customer/profile" className={isActive("/customer/profile")}>My Profile</Link>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* Links shown ONLY when LOGGED OUT */}
            <Link to="/login" className={isActive("/login")}>Login</Link>
            <Link to="/register" className={isActive("/register")}>Create Account</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default CustomerSidebar;