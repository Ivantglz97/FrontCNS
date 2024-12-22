// Login.jsx
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
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
      const id = await clienteAxios.post('/usuario/login', credenciales);
      const respuesta = await clienteAxios.get(`/usuario/${id.data.paciente.id}`, credenciales);
      
      // extraer el datos de usuario y colocarlo en localstorage
      localStorage.setItem('userData', JSON.stringify(respuesta.data));

      // alerta
      console.log(respuesta.data);
      
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
          <h2>Bienvenido a la Cartilla de Salud Digital </h2>
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
