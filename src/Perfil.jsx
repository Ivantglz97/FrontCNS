import React, { useState, useEffect } from 'react';
import './Perfil.css';
import clienteAxios from './config/axios';

const Perfil = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCorreo, setEditedCorreo] = useState('');
  const [editedContrasena, setEditedContrasena] = useState('');
  const [editedNewContrasena, setEditedNewContrasena] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('userData') || localStorage.getItem('pacienteData')) || [{}];
    // const usuario = usuarios.find((usuario) => usuario.id === 1);
    if (usuario) {
      setUserData(usuario);
      setEditedCorreo(usuario.email);
      setEditedContrasena(usuario.password);
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

  const handleNewContrasenaChange = (event) => {
    setEditedNewContrasena(event.target.value);
  };

  const handleSave = () => {
    setShowModal(true);
  };

  const confirmSave = async () => {
    let respuesta = null;
    try {
      if (userData.tipo === 'paciente') {
        respuesta = await clienteAxios.put(`/usuario/${userData.id}`, {
          password: editedContrasena ? editedContrasena : '',
          newEmail: editedCorreo !== userData.email ? editedCorreo : undefined,
          newPassword: editedNewContrasena,
        });
      } else if (userData.tipo === 'medico' || userData.tipo === 'enfermero') {
         respuesta = await clienteAxios.put(`/personal/${userData.id}`, {
          password: editedContrasena ? editedContrasena : '',
          newEmail: editedCorreo !== userData.email ? editedCorreo : undefined,
          newPassword: editedNewContrasena,
        });
      } else if(userData.tipo === 'admin' || userData.tipo === 'superAdmin') {
        respuesta = await clienteAxios.put(`/admin/actualizar-admin/${userData.id}`, {
          password: editedContrasena ? editedContrasena : '',
          newEmail: editedCorreo !== userData.email ? editedCorreo : undefined,
          newPassword: editedNewContrasena
        });
      }
      else {
        console.log('Tipo de usuario no soportado');
      }

      console.log('respuesta', respuesta.data.mensaje);

      if(respuesta.data.mensaje !== 'Password Incorrecto') {
        console.log('Usuario actualizado correctamente, con status:', respuesta);
        const updatedUserData = {
          ...userData,
          email: editedCorreo,
        };
        
        setUserData(updatedUserData);
        setIsEditing(false);
        setShowModal(false);
        
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
      } else {
        console.log('Error al actualizar el usuario:', respuesta.data.mensaje);
        alert('Error al actualizar el usuario, contraseña incorrecta');
        setShowModal(false);
      }
      
    } catch (error) {
      alert('Error al actualizar el usuario');
      console.error('Error al actualizar el usuario:', error);
    }
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
          <img
            src={`http://localhost:3000/img/${userData.foto ? userData.foto : 'avatar.png'}`}
            alt="Avatar"
            className="perfil-avatar"
          />
          <div className="perfil-details">
            <h3>{`${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`}</h3>
            <p>{userData.tipo.toUpperCase()}</p>
          </div>
          <div className="perfil-actions" style={{ marginTop: '20px' }}>
            <button onClick={handleEditToggle}>
              {isEditing ? 'Cancelar' : 'Editar'}
            </button>
            {isEditing && <button onClick={handleSave}>Guardar</button>}
          </div>
          {isEditing && (
              <div>
                <h3>Actualiza tu correo y/o contraseña</h3>
              </div>
            )}
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
          {userData.tipo === 'paciente' && (
            <div>
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
            </div>
          )}
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
              value={isEditing ? editedCorreo : userData.email}
              onChange={handleCorreoChange}
              readOnly={!isEditing}
            />
          </div>
          
          {isEditing && (
            <div>
              <div className="form-row">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  value={editedNewContrasena}
                  onChange={handleNewContrasenaChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Ingresa tu contraseña actual para autorizar el cambio (obligatorio)</label>
                <input
                  type="password"
                  value={editedContrasena}
                  onChange={handleContrasenaChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            
          )}
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
