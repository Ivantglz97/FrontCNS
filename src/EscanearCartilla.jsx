import React, { useState } from 'react';
import './Cartilla.css'; // Para los estilos personalizados
import EscanearDatosG from './EscanearDatosG';
import Cartilla from './Cartilla';

const EscanearCartilla = () => {
  // Estado para mantener la pestaña activa
  const [activeTab, setActiveTab] = useState('escanear');

  // Estado para almacenar el ID escaneado
  const [scannedId, setScannedId] = useState(null);

  // Función para manejar el cambio de tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Función para actualizar el ID escaneado
  const handleScannedId = (id) => {
    setScannedId(id);
  };

  return (
    <div className="tab-container">
      <div className="tab-bar">
        <div
          className={`tab escanear ${activeTab === 'escanear' ? 'active' : ''}`}
          onClick={() => handleTabClick('escanear')}
        >
          Escanear Cartilla
        </div>
        <div
          className={`tab cartilla ${activeTab === 'cartilla' ? 'active' : ''}`}
          onClick={() => handleTabClick('cartilla')}
        >
          Cartilla
        </div>
      </div>

      {/* Mostrar contenido según la pestaña activa */}
      <div className="tab-content">
        {activeTab === 'escanear' && <EscanearDatosG onScan={handleScannedId} />}
        {activeTab === 'cartilla' && <Cartilla scannedId={scannedId} />}
      </div>
    </div>
  );
};

export default EscanearCartilla;
