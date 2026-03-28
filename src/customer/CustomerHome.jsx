import React, { useEffect, useState } from "react";
import "./customer.css";

function CustomerHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      <header>
        <h1>Welcome back, {user?.username}! 👋</h1>
      </header>

      <section className="dashboard-cards">
        <div className="card">
          <h3>Active Subscriptions</h3>
          <p>4</p>
        </div>
        <div className="card" style={{ borderLeft: "4px solid #0dd1c1" }}>
          <h3>Monthly Spending</h3>
          <p>₹4,078</p>
        </div>
        <div className="card">
          <h3>Next Billing Date</h3>
          <p>April 12, 2026</p>
        </div>
      </section>
    </>
  );
}

export default CustomerHome;