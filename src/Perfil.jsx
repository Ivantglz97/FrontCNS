import React, { useState, useEffect } from 'react';
import './Perfil.css';
import perfil from './assets/avatar.avif';

// Simulación de una base de datos 
const usuarios = [
  {
    id: 1,
    nombre: 'Ivan',
    apellidoPaterno: 'Trejo',
    apellidoMaterno: 'Gonzalez',
    edad: 22,
    genero: 'Masculino',
    tipoSangre: 'O-',
    correo: 'ivanejemplo@gmail.com',
    avatar: perfil,
  },
  {
    id: 2,
    nombre: 'Ana',
    apellidoPaterno: 'Lopez',
    apellidoMaterno: 'Martínez',
    edad: 30,
    genero: 'Femenino',
    tipoSangre: 'A+',
    correo: 'anaejemplo@gmail.com',
    avatar: '/avatar2.png',
  },
  // Puedes agregar más usuarios aquí
];

const Perfil = ({ userId }) => {
  // Estado para los datos del perfil
  const [userData, setUserData] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('userData'));
    setUserData(user);

  }, [userId]); // Dependencia en userId

  if (!userData) {
    return <div>Cargando perfil...</div>; // Mostrar mientras se carga el perfil
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <img
            src={perfil}
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
