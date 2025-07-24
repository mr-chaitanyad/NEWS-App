import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          📰 NewsApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink exact="true" to="/home" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/add_news" className="nav-link">
                Add News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/all-news" className="nav-link">
                View All News
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
