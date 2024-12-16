import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from './assets/Logo.png';

const Sidebar = ({ userId }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Estado para controlar si está colapsado
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Función que determina qué elementos del menú se deben mostrar dependiendo del id de usuario
  const getMenuItems = (userId) => {
    switch (3) {
      case 1: // Admin
        return [
          { to: "/usuario/perfil", icon: "👤", label: "Perfil" },
          { to: "/usuario/gestion", icon: "⚙️", label: "Gestión de Usuarios" }
        ];
      case 2: // Salud
        return [
          { to: "/usuario/perfil", icon: "👤", label: "Perfil" },
          { to: "/usuario/cartilla", icon: "📄", label: "Cartilla" },
          { to: "/usuario/medicamentos", icon: "💊", label: "Medicamentos" },
          { to: "/usuario/vacunacion", icon: "💉", label: "Historial de Vacunación" },
          { to: "/usuario/escanear", icon: "📷", label: "Escanear Cartilla" }
        ];
      case 3: // Usuario
        return [
          { to: "/usuario/perfil", icon: "👤", label: "Perfil" },
          { to: "/usuario/cartilla", icon: "📄", label: "Cartilla" },
          { to: "/usuario/medicamentos", icon: "💊", label: "Medicamentos" },
          { to: "/usuario/vacunacion", icon: "💉", label: "Historial de Vacunación" },
          { to: "/usuario/citas", icon: "📅", label: "Próximas Citas" }
        ];
      case 4: // Doctor
        return [
          { to: "/usuario/perfil", icon: "👤", label: "Perfil" },
          { to: "/usuario/escanear", icon: "📷", label: "Escanear Cartilla" }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems(userId);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <nav className="menu">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to} className="icon">
                <i className="icon">{item.icon}</i> {!isCollapsed && item.label}
              </Link>
            </li>
          ))}
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
