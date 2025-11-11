// Header component - shows navigation and user info
import React from "react";
import { Link } from "react-router-dom";

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo - links to home page */}
        <Link to="/" className="logo">
          LinkedIn
        </Link>

        {/* User info and logout button */}
        <div className="user-info">
          <span className="user-name">Welcome, {user?.name}!</span>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
