// Login.jsx
import React, {useState, useContext} from 'react';
import clienteAxios from './config/axios'
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Context
import { CRMContext } from './context/CRMContext';

const Login = () => {
  
  // Auth y token
  const [auth, guardarAuth] = useContext(CRMContext);

  // State con los datos del formulario
  const [credenciales, guardarCredenciales] = useState({});


  const navigate = useNavigate();

  // inicar sesion en el servidor
  const handleSubmit = async (e) => {

    e.preventDefault();
    
    // autenticar al usuario
    try {
        const respuesta = await clienteAxios.post('/usuario/login', credenciales);
        
        // extraer el token y colocarlo en localstorage
        const { token } = respuesta.data;
        localStorage.setItem('token', token);
  
        // colocarlo en el state
        guardarAuth({
            token, 
            auth: true
        })
  
        // alerta
        console.log('Login Correcto');
        
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
        <h1>Equipo 4
        </h1>
        
      </div>
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <h2>Bienvenido a la Cartilla de Salud Digital</h2>
          <label>Usuario</label>
          <input type="text" 
            name='email'
            placeholder="correoejemplo@gmail.com" 
            onChange={leerDatos}
          />
          <label>Contraseña</label>
          <input type="password" 
            name='password' 
            placeholder="********" 
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
