// Login.jsx

import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logo from './assets/Logo.png';

// Importar configuracion de axios
import clienteAxios from './config/axios'

const Login = () => {
  const navigate = useNavigate();

  // State con los datos del formulario
  const [credenciales, guardarCredenciales] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí va la lógica para validar el login
    // autenticar al usuario
    try {
      const user = await clienteAxios.post('/usuario/login', credenciales);
      console.log('usertipo:  ', user)
      let respuesta;
      switch (user.data.tipo) {
        case 'paciente':
          respuesta = await clienteAxios.get(`/usuario/${user.data.id}`, credenciales);
          localStorage.setItem('pacienteData', JSON.stringify(respuesta.data));
          break;

        case 'admin': 
          respuesta = await clienteAxios.get(`/admin/ver-admin/${user.data.id}`, credenciales);
          localStorage.setItem('userData', JSON.stringify(respuesta.data));
          break;
          
        case 'superAdmin': 
          respuesta = await clienteAxios.get(`/admin/ver-admin/${user.data.id}`, credenciales);
          localStorage.setItem('userData', JSON.stringify(respuesta.data));
          break;
          
        default:
          respuesta = await clienteAxios.get(`/personal/${user.data.id}`, credenciales);
          localStorage.setItem('userData', JSON.stringify(respuesta.data));
          break;
      }
      
      
    } catch (error) {
      console.log(error);
      return navigate('/login');
    }

    navigate('/usuario/perfil');
  };

  // almacenar lo que el usuario escribe en el state
  const leerDatos = e => {
    guardarCredenciales({
        ...credenciales,
        [e.target.name] : e.target.value
    })
  }

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
          <input 
            type="text" 
            placeholder="correoejemplo@gmail.com" 
            name='email'
            onChange={leerDatos}
          />
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="********" 
            name='password'
            onChange={leerDatos}
          />
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
