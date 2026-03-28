import React from 'react'
import "./home.css";
export default function About() {
  return (
    <div>
      <h1 style={{color: "White", textAlign: "center"}} className="title">SubSage - Subscription Management Portal</h1>
      <hr/>
      <div className="about">
      <h2>About Our Service</h2>
        <p style={{textAlign:"center"}}>
          Welcome to our Customer Management System. This platform allows 
          customers to manage their subscriptions easily.
        </p>

        <section className="features">
        <h2> Features Of Our App:</h2>

        <div className="feature">
          <div className="card">
            <h3>Smart Plan Comparison</h3>
            <p>
              Compare features, pricing, and benefits side by side before making decisions.
            </p>
          </div>

          <div className="card">
            <h3>Centralized State Management</h3>
            <p>
              Manage selected plans and features efficiently with real-time updates.
            </p>
          </div>

          <div className="card">
            <h3>Derived Calculations</h3>
            <p>
              Automatic total price and feature summaries calculated instantly.
            </p>
          </div>
        </div>
      </section>
      <h2>Our Mission</h2>
        <p style={{textAlign:"center"}}>
          Our goal is to provide a simple and user-friendly experience 
          for customers to manage their services efficiently.
        </p>
        <br/>

        <section className="contact"  >
          <h2>Contact Us</h2>
          <p>Email: support@subsage.com</p>
          <p>Phone: +91 9689022331</p>
        </section>

      </div>
    </div>
  )
}
