import React from 'react';
import './Perfil.css';

const Perfil = () => {
  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>
      <div className="perfil-card">
        <div className="perfil-header">
          <img
            src="/avatar.png" 
            alt="Avatar"
            className="perfil-avatar"
          />
          <div className="perfil-details">
            <h3>Ivan</h3>
            <p>ivanejemplo@gmail.com</p>
          </div>
        </div>
        <form className="perfil-form">
          <div className="form-row">
            <label>Nombre</label>
            <input type="text" placeholder="Ivan"/>
          </div>
          <div className="form-row">
            <label>Apellido Paterno</label>
            <input type="text" placeholder="Trejo"  />
          </div>
          <div className="form-row">
            <label>Apellido Materno</label>
            <input type="text" placeholder="Gonzalez"/>
          </div>
          <div className="form-row">
            <label>Edad</label>
            <input type="number" placeholder="22"/>
          </div>
          <div className="form-row">
            <label>Género</label>
            <select value="Masculino">
              <option>Masculino</option>
              <option>Femenino</option>
            </select>
          </div>
          <div className="form-row">
            <label>Tipo de Sangre</label>
            <select value="O-" >
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
              value="ivanejemplo@gmail.com"
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;
