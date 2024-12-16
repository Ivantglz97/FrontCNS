import React, { useState, useEffect, useContext } from 'react';
import './Cartilla.css'; // Para los estilos personalizados
import Antecedentes from './Antecedentes';
import DatosG from './DatosG';
import AtencionM from './AtencionM';
import Nutricion from './Nutricion';
import ActividadF from './ActividadF';
import SaludSyR from './SaludSyR';
import Vacunacion from './Vacunacion';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

// Context
import { CRMContext } from './context/CRMContext'

// Axios
import clienteAxios from './config/axios';

const Cartilla = () => {
  // Estado para mantener la pestaña activa
  const [activeTab, setActiveTab] = useState('datosGenerales');

  // Estado para las consultas a la API
  const [userData, setUserData] = useState({});
  
  
  const navigate = useNavigate();
  
  useEffect(() => {
  //   if(userData) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
      console.log(userData)
    // si no hay token redirige a login
  //   } else {
  //     return navigate('/login');
  //   }
    
  }, []) 


  // Función para manejar el cambio de tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tab-container">
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === 'datosGenerales' ? 'active' : ''}`}
          onClick={() => handleTabClick('datosGenerales')}
        >
          Datos Generales
        </div>
        <div
          className={`tab ${activeTab === 'antecedentes' ? 'active' : ''}`}
          onClick={() => handleTabClick('antecedentes')}
        >
          Antecedentes
        </div>
        <div
          className={`tab ${activeTab === 'atencionMedica' ? 'active' : ''}`}
          onClick={() => handleTabClick('atencionMedica')}
        >
          Atención Médica
        </div>
        <div
          className={`tab ${activeTab === 'nutricion' ? 'active' : ''}`}
          onClick={() => handleTabClick('nutricion')}
        >
          Nutrición
        </div>
        <div
          className={`tab ${activeTab === 'actividadFisica' ? 'active' : ''}`}
          onClick={() => handleTabClick('actividadFisica')}
        >
          Actividad Física
        </div>
        <div
          className={`tab ${activeTab === 'saludSexualReproductiva' ? 'active' : ''}`}
          onClick={() => handleTabClick('saludSexualReproductiva')}
        >
          Salud Sexual y Reproductiva
        </div>
        <div
          className={`tab ${activeTab === 'vacunacion' ? 'active' : ''}`}
          onClick={() => handleTabClick('vacunacion')}
        >
          Esquema de Vacunación
        </div>
      </div>

      {/* Mostrar contenido según la pestaña activa */}
      <div className="tab-content">
        {/* {activeTab === 'datosGenerales' && <DatosG />} */}
        {activeTab === 'datosGenerales' && <DatosG userData={userData}/>}
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


