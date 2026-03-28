import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pages.css";

function Register({ onSignup }) {
  const [formData, setFormData] = useState({ username: "", email: "", phone: "", password: "" });
  const [error, setError] = useState(""); // State for validation messages
  const navigate = useNavigate();

  // --- PASSWORD VALIDATION LOGIC ---
  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character.";
    }
    return null; // No errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 1. Validate Password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // 2. Check if user already exists
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const userExists = users.some((u) => u.email === formData.email);
    
    if (userExists) {
      setError("An account with this email already exists.");
      return;
    }

    // 3. Save User
    users.push(formData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    
    onSignup(formData); 
    navigate("/customer/home");
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2>Register</h2>

        {/* --- ERROR DISPLAY --- */}
        {error && <div className="error-banner">{error}</div>}

        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        <input 
          type="text" 
          placeholder="Contact/Phone" 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (Min 6 chars + Special Char)" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <button type="submit" className="sibtn">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;