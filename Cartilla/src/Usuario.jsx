import React from 'react';
import Sidebar from './Sidebar'; 
import Navbar from './Navbar'; 
import './Usuario.css'; 
import Perfil from './Perfil';

const Usuario = () => {
  return (
    <div className="usuario-page">
          <Perfil />
    </div>
  );
};

export default Usuario;
