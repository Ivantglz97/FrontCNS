import React, { useState, useEffect } from 'react';
import './Cartilla.css'; // Para los estilos personalizados
import Antecedentes from './Antecedentes';
import DatosG from './DatosG';
import AtencionM from './AtencionM';
import Nutricion from './Nutricion';
import Estudios from './Estudios';
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

  // Estado para los datos de la cartilla
  // const [cartillaData, setCartillaData] = useState(null);


  // Cargar datos al montar el componente
  useEffect( () => {
    
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

    
  }, [userId]); // Dependencia en userId
  
  const fetchCartilla = async () => {
    try {
      const response = await clienteAxios.get(`/usuario/cartilla/${userData.cartillaId}`);
      localStorage.setItem('cartilla', JSON.stringify(response.data));
      
      // setCartillaData(response.data);
      console.log('Cartilla desde Cartilla.jsx:', response.data);

    } catch (error) {
      console.log(error);
    }
  }
  fetchCartilla();
  
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
        {activeTab === 'datosGenerales' && <DatosG userData={userData} />}
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


