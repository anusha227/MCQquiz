import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserStorage from './UserStorage';
import './Navbar.css';

const Navbar = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(UserStorage.isAdminLoggedIn());
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(UserStorage.isUserLoggedIn());
  const navigate = useNavigate();
  const location = useLocation();

  // Update navbar state whenever the location (URL) changes
  useEffect(() => {
    setIsAdminLoggedIn(UserStorage.isAdminLoggedIn());
    setIsUserLoggedIn(UserStorage.isUserLoggedIn());
  }, [location]);

  const handleLogout = () => {
    UserStorage.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Logo Link redirects to the appropriate dashboard based on role */}
      <div className="logo">
        <Link to={isAdminLoggedIn ? "/admin/dashboard" : isUserLoggedIn ? "/user/dashboard" : "/"} className="logo-link">
          Quiz App
        </Link>
      </div>

      <div className="nav-links">
        {/* CASE 1: ADMIN VIEW - Primary Management Links */}
        {isAdminLoggedIn && (
          <>
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            {/* Standardized path with hyphen to match App.js */}
            <Link to="/admin/createtest" className="nav-link">Create Test</Link>
            <Link to="/admin/view-test-results" className="nav-link">View Results</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {/* CASE 2: USER VIEW - Performance and Selection Links */}
        {isUserLoggedIn && (
          <>
            <Link to="/user/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/user/view-results" className="nav-link">View Results</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}

        {/* CASE 3: PUBLIC VIEW - Entry Points */}
        {!isAdminLoggedIn && !isUserLoggedIn && (
          <>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/login" className="nav-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;