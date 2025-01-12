import React from 'react';
import { useLocation } from 'react-router-dom';  // Importa useLocation de react-router-dom
import './Navbar.css';

const Navbar = () => {
  // Usa useLocation para obtener la ruta actual
  const location = useLocation();

  // Función para extraer el nombre de la pestaña desde la ruta
  const getTabName = () => {
    switch (location.pathname) {
      case '/usuario/perfil':
        return 'Perfil';
      case '/usuario/cartilla':
        return 'Cartilla';
      case '/usuario/medicamentos':
        return 'Medicamentos';
      case '/usuario/vacunacion':
        return 'Historial de Vacunación';
      case '/usuario/citas':
        return 'Próximas Citas';
      case '/usuario/gestion':
        return 'Gestión de Usuarios';
        case '/usuario/escanear':
        return 'Escanear Cartilla';
      default:
        return 'Página Principal'; // Nombre por defecto si no coincide con ninguna ruta
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <h1>{`${getTabName()}`}</h1> {/* Muestra el nombre de la pestaña actual */}
      </div>
    </header>
  );
};

export default Navbar;

