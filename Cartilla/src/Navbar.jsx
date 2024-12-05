import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1>Bienvenido </h1>
        <div className="user-info">
          <img
            src="/user-icon.png" /* Cambia esto por el icono del usuario */
            alt="Usuario"
            className="user-icon"
          />
          <span className="username">Ivan</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
