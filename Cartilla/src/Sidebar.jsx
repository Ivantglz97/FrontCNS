import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from './assets/Logo.png';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar si está colapsado
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/usuario/perfil" className="icon">
              <i className="icon">👤</i> {!isCollapsed && 'Perfil'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/cartilla">
              <i className="icon">📄</i> {!isCollapsed && 'Cartilla'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/medicamentos">
              <i className="icon">💊</i> {!isCollapsed && 'Medicamentos'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/vacunacion">
              <i className="icon">💉</i> {!isCollapsed && 'Historial de Vacunación'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/citas">
              <i className="icon">📅</i> {!isCollapsed && 'Próximas Citas'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/gestion">
              <i className="icon">⚙️</i> {!isCollapsed && 'Gestión de Usuarios'}
            </Link>
          </li>
          <li>
            <Link to="/usuario/escanear">
              <i className="icon">📷</i> {!isCollapsed && 'Escanear Cartilla'}
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <i className="icon">🚪</i> {!isCollapsed && 'Cerrar Sesión'}
      </button>

      <button onClick={toggleSidebar} className="toggle-btn">
        {isCollapsed ? '☰' : '×'} {/* Mostrar un ícono de menú o cerrar */}
      </button>
    </aside>
  );
};

export default Sidebar;
