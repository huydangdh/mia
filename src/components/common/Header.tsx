
// Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from '../usermanagement/UserAuthorization';
import './Header.css';

const Header = () => {
  const { logout } = useAuthorization();

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            Z-MES
          </Link>
          <div className="menu">
            <ul className="nav-links">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reports" className="nav-link">
                  Reports
                </Link>
              </li>
              {/* Add more menu items here based on permissions */}
            </ul>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

