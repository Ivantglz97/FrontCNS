import React, { useState, useEffect } from 'react';
import './Perfil.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
// Axios
import clienteAxios from './config/axios';


const Perfil = () => {
  // Estado para los datos del perfil
  const [userData, setUserData] = useState();

  // Obtener el token
  const token = localStorage.getItem('token');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if(token !== '') {
      
      // Obtener datos decoficando el token
      const datosToken = jwtDecode(token);
      
      // Query a la API
      const consultarAPI = async () => {
        try {
          const respuesta = await clienteAxios.get(`usuario/${datosToken.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          // Almacenar datos del usuario en localStorage
          localStorage.setItem('userData', JSON.stringify(respuesta.data));
          
          // Guardar respuesta del Query en el state
          setUserData(respuesta.data)
          console.log('Data desde perfil: ', userData)

        } catch (error) {
          // Error con autorizacion
          if(error.response.status === 500) {
            return navigate('/login');
          }
        }
      }
      consultarAPI();

    // si no hay token redirige a login
    } else {
      return navigate('/login');
    }
    
  }, [])

  if (!userData) {
    return <div>Cargando perfil...</div>; // Mostrar mientras se carga el perfil
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <img
            src={userData.avatar}
            alt="Avatar"
            className="perfil-avatar"
          />
          <div className="perfil-details">
            <h3>{`${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`}</h3>
            <p>{userData.correo}</p>
          </div>
        </div>
        <form className="perfil-form">
          <div className="form-row">
            <label>Nombre</label>
            <input type="text" value={userData.nombre} readOnly />
          </div>
          <div className="form-row">
            <label>Apellido Paterno</label>
            <input type="text" value={userData.apellidoPaterno} readOnly />
          </div>
          <div className="form-row">
            <label>Apellido Materno</label>
            <input type="text" value={userData.apellidoMaterno} readOnly />
          </div>
          <div className="form-row">
            <label>Edad</label>
            <input type="number" value={userData.edad} readOnly />
          </div>
          <div className="form-row">
            <label>Género</label>
            <select value={userData.genero} disabled>
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          </div>
          <div className="form-row">
            <label>Tipo de Sangre</label>
            <select value={userData.tipoSangre} disabled>
              <option>O-</option>
              <option>O+</option>
              <option>A-</option>
              <option>A+</option>
              <option>AB-</option>
              <option>AB+</option>
            </select>
          </div>
          <div className="form-row">
            <label>Correo</label>
            <input
              type="email"
              value={userData.email}
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
