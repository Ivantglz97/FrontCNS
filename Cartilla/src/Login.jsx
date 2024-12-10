// Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí va la lógica para validar el login
    navigate('/usuario/perfil');
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <div className="gradient-background"></div>
        <h1>Equipo 4
        </h1>
        
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <h2>Bienvenido a la Cartilla de Salud Digital</h2>
          <label>Usuario</label>
          <input type="text" placeholder="correoejemplo@gmail.com" />
          <label>Contraseña</label>
          <input type="password" placeholder="********" />
          <div className="options">
            <label>
              <input type="checkbox" /> Recuerdame
            </label>
            <a href="#">Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className="login-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
