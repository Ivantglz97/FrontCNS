import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; 
import Citas from './Citas'; 
import Cartilla from './Cartilla';
import Layout from "./Layout";
import Medicamentos from './Medicamentos'; 
import Perfil from './Perfil';
import Vacunacion from './Vacunacion';
import { Navigate } from 'react-router-dom';  
import GestionUsuarios from './GestionUsuarios';
import EscanearCartilla from './EscanearCartilla';
import ReestablecerContraseña from './ReestablecerContraseña';
import Registrar from './Registrar'
import ContraseñaAct from './ContraseñaAct'
import AltaPacientes from './AltaPacientes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta de inicio: redirigir automáticamente a /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta del Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/olvidaste-contrasena" element={<ReestablecerContraseña />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/contrasena-actualizada" element={<ContraseñaAct />} />

        {/* Rutas protegidas bajo Layout */}
        <Route path="/usuario" element={<Layout />}>
          <Route path="perfil" element={<Perfil />} /> {/* Ruta relativa */}
          <Route path="cartilla" element={<Cartilla />} />
          <Route path="medicamentos" element={<Medicamentos />} />
          <Route path="vacunacion" element={<Vacunacion />} />
          <Route path="citas" element={<Citas />} />
          <Route path="gestion" element={<GestionUsuarios />} />
          <Route path="escanear" element={<EscanearCartilla />} />
          <Route path="altapaciente" element={<AltaPacientes />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
