import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";
function Register({ onSignup }) {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    
    onSignup(formData); // Set global login state
    navigate("/customer/home"); // Redirect to home
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Register</h2>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="text" placeholder="Contact/Phone" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit" className="sibtn">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;