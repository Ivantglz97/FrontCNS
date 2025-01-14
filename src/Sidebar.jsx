import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from './assets/Logo.png';
import LogoutIcon from '@mui/icons-material/Logout'; // Icono de logout
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Icono de perfil
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Icono de cartilla
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Icono de medicamentos
import VaccinesIcon from '@mui/icons-material/Vaccines'; // Icono de vacunas
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'; // Icono de escanear cartilla
import EventIcon from '@mui/icons-material/Event'; // Icono de citas
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // Icono de gestión de usuarios

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
    switch (2) {
      case 1: // Admin
        return [
          { to: "/usuario/perfil", icon: <AccountBoxIcon />, label: "Perfil" },
          { to: "/usuario/gestion", icon: <ManageAccountsIcon />, label: "Gestión de Usuarios" } // Cambio aquí
        ];
      case 2: // Salud
        return [
          { to: "/usuario/perfil", icon: <AccountBoxIcon />, label: "Perfil" },
          { to: "/usuario/cartilla", icon: <MenuBookIcon />, label: "Cartilla" },
          { to: "/usuario/vacunacion", icon: <VaccinesIcon />, label: "Historial de Vacunación" },
          { to: "/usuario/escanear", icon: <QrCodeScannerIcon />, label: "Escanear Cartilla" }
        ];
      case 3: // Usuario
        return [
          { to: "/usuario/perfil", icon: <AccountBoxIcon />, label: "Perfil" },
          { to: "/usuario/cartilla", icon: <MenuBookIcon />, label: "Cartilla" },
          { to: "/usuario/vacunacion", icon: <VaccinesIcon />, label: "Historial de Vacunación" },
          { to: "/usuario/citas", icon: <EventIcon />, label: "Próximas Citas" }
        ];
      case 4: // Doctor
        return [
          { to: "/usuario/perfil", icon: <AccountBoxIcon />, label: "Perfil" },
          { to: "/usuario/escanear", icon: <QrCodeScannerIcon />, label: "Escanear Cartilla" }
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
        <LogoutIcon /> {/* Reemplaza el emoji con el icono de Logout */}
        {!isCollapsed && 'Cerrar Sesión'}
      </button>
    </aside>
  );
};

export default Sidebar;
