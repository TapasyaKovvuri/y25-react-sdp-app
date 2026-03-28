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
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setIsLoggedIn(true);
  }, []);

  const handleAuth = (userData) => {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setActivePlan(null);
  };

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<CustomerLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
          {/* Public Routes */}
          <Route path="login" element={<Login onLogin={handleAuth} />} />
          <Route path="register" element={<Register onSignup={handleAuth} />} />
          <Route path="plans" element={<MyPlans onSelectPlan={setActivePlan} currentPlan={activePlan} />} />

          {/* Protected Routes */}
          <Route path="customer/home" element={isLoggedIn ? <CustomerHome activePlan={activePlan} /> : <Navigate to="/login" />} />
          <Route path="customer/subscriptions" element={isLoggedIn ? <MySubscriptions activePlan={activePlan} /> : <Navigate to="/login" />} />
          <Route path="customer/history" element={isLoggedIn ? <SubHistroy /> : <Navigate to="/login" />} />
          <Route path="customer/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          
          <Route index element={<Navigate to={isLoggedIn ? "/customer/home" : "/plans"} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;