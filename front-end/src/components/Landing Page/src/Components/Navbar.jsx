import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Styles/Navbar.css';  // Ensure you have a corresponding CSS file for styling

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          ArogyaVault
        </div>
        <div className="menu-icon" onClick={openNav}>
          <FontAwesomeIcon icon={nav ? faXmark : faBars} />
        </div>
        <div className={`nav-menu ${nav ? 'nav-menu-active' : ''}`}>
          <a href="#home" className="nav-item">Home</a>
          <a href="#features" className="nav-item">Features</a>
          <a href="#about" className="nav-item">About</a>
          <a href="#contact" className="nav-item">Contact</a>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className={`mobile-navbar ${nav ? 'open-nav' : ''}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>
        <div className="mobile-nav-content">
          <a href="#home" className="mobile-nav-item" onClick={openNav}>Home</a>
          <a href="#features" className="mobile-nav-item" onClick={openNav}>Features</a>
          <a href="#about" className="mobile-nav-item" onClick={openNav}>About</a>
          <a href="#contact" className="mobile-nav-item" onClick={openNav}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
