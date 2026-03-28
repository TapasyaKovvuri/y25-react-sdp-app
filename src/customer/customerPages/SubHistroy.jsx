import React from "react";

function SubHistroy() {
  const transactions = [
    { id: 1, date: "2026-03-15", amount: 499.99, plan: "Premium Plan", status: "Paid" },
    { id: 2, date: "2026-02-15", amount: 399.99, plan: "Premium Plan", status: "Paid" },
    { id: 3, date: "2026-01-15", amount: 199.99, plan: "Basic Plan", status: "Paid" },
  ];

  return (
    <div className="page-content">
      <h2>Billing & Transaction History</h2>
      <p>View your past payments and plan changes.</p>
      
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.plan}</td>
              <td>₹{item.amount.toFixed(2)}</td>
              <td><span className="status-badge paid">{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubHistroy;