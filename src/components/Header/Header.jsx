// src/components/Header/Header.jsx
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">Residency Atlas</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">AI Help</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
