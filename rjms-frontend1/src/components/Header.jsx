import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import "../App.css"; // import styles

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="h1eader flex items-center justify-between p-4 bg-blue-600 text-white">
      <div className="h1eader-container">
        <Link className="b1rand" to="/">RJMS</Link>

        <ul className="n1av-links">
          <li><Link to="/articles">Articles</Link></li>
        </ul>

        <ul className="a1uth-links">
          {user ? (
            <>
              <li className="w1elcome">Hi, {user.name || user.email}</li>
              <li><button className="l1ogout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
