import React from 'react';
import { Tab, Tabs, Container } from 'react-bootstrap';
import RegistrarP from './RegistrarP';
import './GestionUsuarios.css'; // Importa el archivo CSS

const AltaPacientes = () => {
  return (
    <div className="tab-container">
      
          <RegistrarP />
    </div>
  );
};

export default AltaPacientes;
