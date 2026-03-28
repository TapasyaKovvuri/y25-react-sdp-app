import React from "react";
import { Outlet } from "react-router-dom";
import CustomerSideBar from "./CustomerSideBar";

function CustomerLayout({ isLoggedIn, onLogout }) {
  return (
    <div className="customer-layout">
      {/* Sidebar is rendered immediately */}
      <CustomerSideBar isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <main className="customer-main">
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;