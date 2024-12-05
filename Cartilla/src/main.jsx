// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; // Asegúrate de que la ruta sea correcta
import Usuario from './Usuario'; // Asegúrate de que la ruta sea correcta

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </Router>
  </StrictMode>
);
