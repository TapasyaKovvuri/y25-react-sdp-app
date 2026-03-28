import React from "react";
//import "./customer.css";

function MySubscriptions({ activePlan, setActivePlan }) {
  // Mock data for an expired plan to show "History/Inactive" section
  const expiredPlan = { name: "Basic Plan", price: 199.99, date: "Jan 15, 2026" };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>My Subscriptions</h2>
        <p className="subtitle">Manage your active plans and billing cycles.</p>
      </div>

      {/* --- ACTIVE SUBSCRIPTION SECTION --- */}
      <section className="sub-section">
        <h3 className="section-title">Current Plan</h3>
        {activePlan ? (
          <div className="subscription-card active">
            <div className="card-badge">ACTIVE</div>
            <div className="card-main">
              <div className="plan-info">
                <h3>{activePlan.name}</h3>
                <p>Renews on: <strong>April 28, 2026</strong></p>
              </div>
              <div className="plan-price">
                <span className="amount">₹{activePlan.price}</span>
                <span className="period">/month</span>
              </div>
            </div>
            <div className="card-actions">
              <button className="manage-btn">Update Payment</button>
              <button className="cancel-btn" onClick={() => setActivePlan(null)}>
                Cancel Subscription
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-sub-card">
            <p>You don't have an active subscription.</p>
            <button className="browse-btn">Browse Plans</button>
          </div>
        )}
      </section>

      {/* --- INACTIVE/EXPIRED SECTION --- */}
      <section className="sub-section">
        <h3 className="section-title">Inactive Subscriptions</h3>
        <div className="subscription-card expired">
          <div className="card-main">
            <div className="plan-info">
              <h3>{expiredPlan.name}</h3>
              <p>Expired on: {expiredPlan.date}</p>
            </div>
            <div className="plan-price muted">
              <span>₹{expiredPlan.price}</span>
            </div>
          </div>
          <button className="renew-btn">Renew Now</button>
        </div>
      </section>
    </div>
  );
}

export default MySubscriptions;