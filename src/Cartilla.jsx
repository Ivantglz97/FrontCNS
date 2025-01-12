import React, { useState } from 'react';
import './Cartilla.css'; // Para los estilos personalizados
import Antecedentes from './Antecedentes';
import DatosG from './DatosG';
import AtencionM from './AtencionM';
import Nutricion from './Nutricion';
import Estudios from './Estudios';
import SaludSyR from './SaludSyR';
import Vacunacion from './Vacunacion';


const Cartilla = () => {
  // Estado para mantener la pestaña activa
  const [activeTab, setActiveTab] = useState('datosGenerales');

  // Función para manejar el cambio de tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tab-bar">
      <div
        className={`tab datosGenerales ${activeTab === 'datosGenerales' ? 'active' : ''}`}
        onClick={() => handleTabClick('datosGenerales')}
      >
        Datos Generales
      </div>
      <div
        className={`tab antecedentes ${activeTab === 'antecedentes' ? 'active' : ''}`}
        onClick={() => handleTabClick('antecedentes')}
      >
        Antecedentes
      </div>
      <div
        className={`tab atencionMedica ${activeTab === 'atencionMedica' ? 'active' : ''}`}
        onClick={() => handleTabClick('atencionMedica')}
      >
        Atención Médica
      </div>
      <div
        className={`tab nutricion ${activeTab === 'nutricion' ? 'active' : ''}`}
        onClick={() => handleTabClick('nutricion')}
      >
        Nutrición
      </div>
      <div
        className={`tab estudios ${activeTab === 'estudios' ? 'active' : ''}`}
        onClick={() => handleTabClick('estudios')}
      >
        Estudios
      </div>
      <div
        className={`tab saludSexualReproductiva ${activeTab === 'saludSexualReproductiva' ? 'active' : ''}`}
        onClick={() => handleTabClick('saludSexualReproductiva')}
      >
        Salud Sexual y Reproductiva
      </div>
      <div
        className={`tab vacunacion ${activeTab === 'vacunacion' ? 'active' : ''}`}
        onClick={() => handleTabClick('vacunacion')}
      >
        Esquema de Vacunación
      </div>
    </div>

      {/* Mostrar contenido según la pestaña activa */}
      <div className="tab-content">
        {activeTab === 'datosGenerales' && <DatosG />}
        {activeTab === 'antecedentes' && <Antecedentes />}
        {activeTab === 'atencionMedica' && <AtencionM />}
        {activeTab === 'nutricion' && <Nutricion />}
        {activeTab === 'estudios' && <Estudios />}
        {activeTab === 'saludSexualReproductiva' && <SaludSyR />}
        {activeTab === 'vacunacion' && <Vacunacion />}
      </div>
    </div>
  );
};

export default Cartilla;


