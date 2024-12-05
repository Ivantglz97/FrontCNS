import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          src="/logo.png" /* Cambia esta ruta por tu logo */
          alt="Logo"
          className="logo-image"
        />
        <h1>Cartilla Nacional de Salud</h1>
      </div>
      <nav className="menu">
        <ul>
          <li>
            <a href="#perfil" className="active">
              <i className="icon">👤</i> Perfil
            </a>
          </li>
          <li>
            <a href="#cartilla">
              <i className="icon">📄</i> Cartilla
            </a>
          </li>
          <li>
            <a href="#medicamentos">
              <i className="icon">💊</i> Medicamentos
            </a>
          </li>
          <li>
            <a href="#vacunacion">
              <i className="icon">💉</i> Historial de Vacunación
            </a>
          </li>
          <li>
            <a href="#citas">
              <i className="icon">📅</i> Próximas Citas
            </a>
          </li>
        </ul>
      </nav>
      <button className="logout-button">
        <i className="icon">🚪</i> Cerrar Sesión
      </button>
    </aside>
  );
};

export default Sidebar;


