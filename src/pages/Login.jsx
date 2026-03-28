import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // --- 1. PRE-SUBMISSION VALIDATION ---
    // Simple check: Password must be at least 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // --- 2. DATABASE AUTHENTICATION ---
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Find matching user
    const user = users.find(u => u.email === email);

    if (!user) {
      setError("No account found with this email.");
      return;
    }

    // Check if password matches
    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      alert("Incorrect password. Please try again.");
      return;
    }

    // --- 3. SUCCESS ---
    onLogin(user); 
    navigate("/customer/home");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to SubSage</h2>
        
        {/* Error message display */}
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password (min 6 chars)"
              required 
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;