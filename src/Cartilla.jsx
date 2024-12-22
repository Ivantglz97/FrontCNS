import React, { useState, useEffect } from 'react';
import './Cartilla.css'; // Para los estilos personalizados
import Antecedentes from './Antecedentes';
import DatosG from './DatosG';
import AtencionM from './AtencionM';
import Nutricion from './Nutricion';
import ActividadF from './ActividadF';
import SaludSyR from './SaludSyR';
import Vacunacion from './Vacunacion';

// Importar axios
import clienteAxios from './config/axios';

const Cartilla = ({userId}) => {
  // Estado para mantener la pestaña activa
  const [activeTab, setActiveTab] = useState('datosGenerales');

  // Función para manejar el cambio de tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Estado para los datos del perfil
  const [userData, setUserData] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    
    const getData = () => {
      const user = JSON.parse(localStorage.getItem('userData'));
      try {
        setUserData(user);
        // alerta
        console.log('Datos de cartilla:', user);
              
      } catch (error) {
        console.log(error);
        return navigate('/login');
      }
    }
    getData();


    // Simular la carga de datos a partir del ID
    // const usuario = usuarios.find((usuario) => usuario.id === 1);
    // if (usuario) {
    //   setUserData(usuario);
    // }
  }, [userId]); // Dependencia en userId

  if (!userData) {
    return <div>Cargando cartilla del paciente...</div>; // Mostrar mientras se carga el perfil
  }

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
        className={`tab actividadFisica ${activeTab === 'actividadFisica' ? 'active' : ''}`}
        onClick={() => handleTabClick('actividadFisica')}
      >
        Actividad Física
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
        {activeTab === 'datosGenerales' && <DatosG userData={userData} />}
        {activeTab === 'antecedentes' && <Antecedentes />}
        {activeTab === 'atencionMedica' && <AtencionM />}
        {activeTab === 'nutricion' && <Nutricion />}
        {activeTab === 'actividadFisica' && <ActividadF />}
        {activeTab === 'saludSexualReproductiva' && <SaludSyR />}
        {activeTab === 'vacunacion' && <Vacunacion />}
      </div>
    </div>
  );
};

export default Cartilla;


