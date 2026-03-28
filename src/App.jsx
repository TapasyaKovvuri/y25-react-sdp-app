import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CustomerLayout from './customer/CustomerLayout';
import CustomerHome from './customer/CustomerHome';
import MyPlans from './customer/customerPages/MyPlans';
import Profile from './customer/customerPages/Profile';
import MySubscriptions from './customer/customerPages/MySubscriptions';
import SubHistroy from './customer/customerPages/SubHistroy';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // 1. Initialize activePlan from localStorage so it persists on refresh
  const [activePlan, setActivePlan] = useState(() => {
    const savedPlan = localStorage.getItem("activePlan");
    return savedPlan ? JSON.parse(savedPlan) : null;
  });

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setIsLoggedIn(true);
  }, []);

  // 2. Sync activePlan to localStorage whenever it changes
  useEffect(() => {
    if (activePlan) {
      localStorage.setItem("activePlan", JSON.stringify(activePlan));
    } else {
      localStorage.removeItem("activePlan");
    }
  }, [activePlan]);

  const handleAuth = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("activePlan"); // Clear plan on logout
    setIsLoggedIn(false);
    setActivePlan(null);
  };

  return (
    <Router basename="/y25-react-sdp-app">
      <Routes>
        <Route path="/" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          {/* Public Routes */}
          <Route path="login" element={<Login onLogin={handleAuth} />} />
          <Route path="register" element={<Register onSignup={handleAuth} />} />
          <Route path="plans" element={<MyPlans onSelectPlan={setActivePlan} currentPlan={activePlan} />} />

          {/* Protected Routes */}
          {/* FIX: Passed setActivePlan prop to MySubscriptions below */}
          <Route 
            path="customer/home" 
            element={isLoggedIn ? <CustomerHome activePlan={activePlan} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="customer/subscriptions" 
            element={isLoggedIn ? (
              <MySubscriptions activePlan={activePlan} setActivePlan={setActivePlan} /> 
            ) : (
              <Navigate to="/login" />
            )} 
          />
          <Route path="customer/history" element={isLoggedIn ? <SubHistroy /> : <Navigate to="/login" />} />
          <Route path="customer/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          
          <Route index element={<Navigate to={isLoggedIn ? "/customer/home" : "/plans"} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;