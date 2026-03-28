import React from "react";
import { useNavigate } from "react-router-dom";
import "../customer.css"; 

function MySubscriptions({ activePlan, setActivePlan }) {
  const navigate = useNavigate();
  
  // This is a dummy record for UI consistency
  const expiredPlan = { name: "Mobile Plan", price: 199, date: "Jan 15, 2026" };

  // --- HANDLER FUNCTIONS ---
  
  const handleCancelSubscription = () => {
    // Check if setActivePlan exists to prevent "is not a function" errors
    if (!setActivePlan) {
      console.error("Error: setActivePlan prop is missing!");
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel your active subscription?");
    
    if (confirmCancel) {
      setActivePlan(null); // This updates the state in App.js
      alert("Subscription cancelled successfully.");
    }
  };

  const handleRenewExpired = () => {
    // If user clicks renew on the inactive card, we send them to the plans page
    navigate("/plans");
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>My Subscriptions</h2>
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
                <h3 style={{ color: 'var(--text-main)' }}>{activePlan.name}</h3>
                <p>Renews on: <strong>April 28, 2026</strong></p>
              </div>
              <div className="plan-price">
                <span className="amount">₹{activePlan.price}</span>
                <span className="period">/month</span>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="manage-btn">Update Payment</button>
              <button 
                className="cancel-btn" 
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-sub-card" style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            background: '#f9f9f9', 
            borderRadius: '12px',
            border: '2px dashed #ddd' 
          }}>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              You don't have an active subscription at the moment.
            </p>
            <button className="choose-plan-btn" onClick={() => navigate("/plans")}>
              Browse & Choose a Plan
            </button>
          </div>
        )}
      </section>

      {/* --- INACTIVE/EXPIRED SECTION --- */}
      <section className="sub-section" style={{ marginTop: '3rem' }}>
        <h3 className="section-title">Inactive Subscriptions</h3>
        <div className="subscription-card expired" style={{ opacity: 0.7 }}>
          <div className="card-main">
            <div className="plan-info">
              <h3>{expiredPlan.name}</h3>
              <p>Expired on: {expiredPlan.date}</p>
            </div>
            <div className="plan-price muted">
              <span>₹{expiredPlan.price}</span>
            </div>
          </div>
          <button className="renew-btn" onClick={handleRenewExpired}>
            Renew Now
          </button>
        </div>
      </section>

      {/* --- HELP BOX --- */}
      <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#eef2ff', borderRadius: '8px' }}>
        <h4 style={{ color: '#4338ca', marginBottom: '0.5rem' }}>Need help with your billing?</h4>
        <p style={{ fontSize: '0.9rem', color: '#3730a3' }}>
          Contact our support team for refund queries or technical issues with your payment methods.
        </p>
      </div>
    </div>
  );
}

export default MySubscriptions;