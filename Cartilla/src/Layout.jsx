import React, { useContext} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { CRMContext, CRMProvider } from './context/CRMContext';


const Layout = () => {

  // utilizar context en el componente
  const [ auth, guardarAuth ] = useContext(CRMContext);

  
  return (
    <CRMProvider value={[ auth, guardarAuth ]}>
      <div className="usuario-page">
        {/* Barra lateral */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="content">
          {/* Barra de navegación */}
          <Navbar />

          {/* Contenido principal de cada página */}
          <div className="main-content">
            <Outlet /> {/* Renderiza el contenido específico de cada ruta */}
          </div>
        </div>
      </div>
    </CRMProvider>
  );
};

export default Layout;

