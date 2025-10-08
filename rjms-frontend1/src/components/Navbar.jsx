import React, { useContext } from "react";
import "../App.css"; // make sure App.css is imported here or in App.jsx
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="navbar">
      <h1 className="navbar-title">Journal Management System</h1>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">Hello, {user.name}</span>
            <button className="btn-logout" onClick={logout} style={{marginLeft: '8px'}}>
              Logout
            </button>
            <img
              src={`https://i.pravatar.cc/40?u=${user.email}`}
              alt="profile"
              className="navbar-avatar"
              style={{marginLeft: '8px'}}
            />
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link" style={{marginLeft: '8px'}}>Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
