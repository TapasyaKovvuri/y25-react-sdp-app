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

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Find matching user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user); // Triggers App.jsx to show Sidebar
      navigate("/customer/home");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to SubSage</h2>
        {error && <p className="error-msg">{error}</p>}
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
              placeholder="Enter password"
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