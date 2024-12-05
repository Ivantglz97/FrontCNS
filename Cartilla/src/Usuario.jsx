import React from 'react';
import Sidebar from './Sidebar'; // Importar Sidebar
import Navbar from './Navbar'; // Importar Navbar
import './Usuario.css'; // Estilos generales
import Perfil from './Perfil';

const Usuario = () => {
  return (
    <div className="usuario-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-content">
          <Perfil />
        </div>
      </div>
    </div>
  );
};

export default Usuario;
