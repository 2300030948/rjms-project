import React from "react";
import "../App.css"; // make sure App.css is imported here or in App.jsx

function Navbar() {
  return (
    <header className="navbar">
      <h1 className="navbar-title">Journal Management System</h1>
      <div className="navbar-right">
        <span className="navbar-user">Hello, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="navbar-avatar"
        />
      </div>
    </header>
  );
}

export default Navbar;
