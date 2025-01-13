import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const Layout = () => {
  const user = JSON.parse(localStorage.getItem('userData'));
  const userType = user.tipo;

  return (

    <div className="usuario-page">
      {/* Barra lateral */}
      <Sidebar userType={userType}/>

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
  );
};

export default Layout;

