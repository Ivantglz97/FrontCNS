// Login.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from './assets/Logo.png';

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
        <img src={logo} alt="Logo" className="logo-image" />
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
              <input type="checkbox" /> Recuérdame
            </label>
            <Link to="/olvidaste-contrasena">Olvidaste tu contraseña?</Link>
          </div>
          <button type="submit" className="login-button">Ingresar</button>
          <button
            type="button"
            className="register-button"
            onClick={() => navigate('/registrar')}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
