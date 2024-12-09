import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom
import './Sidebar.css';
import logo from './assets/Logo.png'; // Importa la imagen como una variable

const Sidebar = () => {
  const navigate = useNavigate(); // Define la función de navegación

  const handleLogout = () => {
    // Aquí puedes agregar lógica para limpiar el estado de autenticación si es necesario
    // Ejemplo: borrar el token o limpiar el estado de usuario

    // Redirigir al login
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          src={logo} // Usa la variable importada
          alt="Logo"
          className="logo-image"
        />
      </div>
      <nav className="menu">
        <ul>
          <li>
            <Link to="/usuario/perfil" className="active">
              <i className="icon">👤</i> Perfil
            </Link>
          </li>
          <li>
            <Link to="/usuario/cartilla">
              <i className="icon">📄</i> Cartilla
            </Link>
          </li>
          <li>
            <Link to="/usuario/medicamentos">
              <i className="icon">💊</i> Medicamentos
            </Link>
          </li>
          <li>
            <Link to="/usuario/vacunacion">
              <i className="icon">💉</i> Historial de Vacunación
            </Link>
          </li>
          <li>
            <Link to="/usuario/citas">
              <i className="icon">📅</i> Próximas Citas
            </Link>
          </li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        <i className="icon">🚪</i> Cerrar Sesión
      </button>
    </aside>
  );
};

export default Sidebar;

