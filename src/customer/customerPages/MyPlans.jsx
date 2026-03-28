import React from "react";
import "../customer.css";

function MyPlans({ onSelectPlan, currentPlan }) {
  const plans = [
    {
      name: "Mobile Plan",
      price: "199",
      features: ["480p Streaming", "Mobile & Tablet only", "Standard Support", "Basic Content Access"],
      popular: false
    },
    {
      name: "Premium Plan",
      price: "499",
      features: ["4K + HDR Streaming", "4 Devices (TV/Laptop/Phone)", "Priority Support", "Offline Downloads"],
      popular: true
    }
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>Subscription Plans</h2>
        <p style={{ color: '#6b7280' }}>Enjoy unlimited content in your preferred quality.</p>
      </div>
      
      <div className="plans-grid">
        {plans.map((plan) => {
          const isSelected = currentPlan?.name === plan.name;

          return (
            <div 
              key={plan.name} 
              className={`plan-card ${plan.popular ? 'popular' : ''}`} 
              style={plan.popular ? { borderColor: '#0dd1c1', borderTopWidth: '4px' } : {}}
            >
              {plan.popular && (
                <span style={{ color: '#0dd1c1', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '1px' }}>
                  MOST POPULAR
                </span>
              )}
              
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem', fontWeight: '700' }}>{plan.name}</h3>
              
              <p className="price" style={{ fontSize: '2.2rem', fontWeight: '800', margin: '1rem 0', color: '#111827' }}>
                ₹{plan.price}<span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '400' }}>/mo</span>
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '1.5rem 0', flexGrow: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                    <span style={{ color: '#0dd1c1', marginRight: '0.75rem', fontWeight: 'bold' }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button 
                className="choose-plan-btn"
                onClick={() => onSelectPlan(plan)}
                disabled={isSelected}
                style={{ 
                  backgroundColor: isSelected ? '#e5e7eb' : '#111827',
                  color: isSelected ? '#9ca3af' : '#ffffff',
                  cursor: isSelected ? 'default' : 'pointer'
                }}
              >
                {isSelected ? "Current Plan" : `Choose ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPlans;