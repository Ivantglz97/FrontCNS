import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Perfil from "./Perfil";

const Layout = () => {
  return (
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
  );
};

export default Layout;

