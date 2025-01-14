import React, { useState, useEffect } from 'react';
import './Perfil.css';
import perfil from './assets/avatar.avif';

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
    contrasena: '123456',
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
    contrasena: 'password',
  },
];

const Perfil = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCorreo, setEditedCorreo] = useState('');
  const [editedContrasena, setEditedContrasena] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const usuario = usuarios.find((usuario) => usuario.id === 1);
    if (usuario) {
      setUserData(usuario);
      setEditedCorreo(usuario.correo);
      setEditedContrasena(usuario.contrasena);
    }
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCorreoChange = (event) => {
    setEditedCorreo(event.target.value);
  };

  const handleContrasenaChange = (event) => {
    setEditedContrasena(event.target.value);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      correo: editedCorreo,
      contrasena: editedContrasena,
    }));
    setIsEditing(false);
    setShowModal(false);
  };

  const cancelSave = () => {
    setShowModal(false);
  };

  if (!userData) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <img src={userData.avatar} alt="Avatar" className="perfil-avatar" />
          <div className="perfil-details">
            <h3>{`${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`}</h3>
            <p>{userData.correo}</p>
          </div>
          <div className="perfil-actions" style={{ marginTop: '20px' }}>
            <button onClick={handleEditToggle}>
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
            {isEditing && <button onClick={handleSave}>Guardar</button>}
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
              value={isEditing ? editedCorreo : userData.correo}
              onChange={handleCorreoChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="form-row">
            <label>Contraseña</label>
            <input
              type="password"
              value={isEditing ? editedContrasena : userData.contrasena}
              onChange={handleContrasenaChange}
              readOnly={!isEditing}
            />
          </div>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmar Cambios</h3>
            <p>¿Estás seguro de que deseas guardar los cambios?</p>
            <div className="modal-buttons">
              <button className="confirm-button" onClick={confirmSave}>Confirmar</button>
              <button className="cancel-button" onClick={cancelSave}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;
