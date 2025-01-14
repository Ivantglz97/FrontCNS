import React, { useState } from 'react';
import './DatosG.css';
import QRCode from 'react-qr-code'; // Importamos la librería

const EscanearDatos = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleEdit = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const saveChanges = () => {
    setShowModal(true);
  };

  const confirmSave = () => {
    setIsEditing(false);
    setShowModal(false);
  };

  const cancelSave = () => {
    setEditedData(userData);
    setIsEditing(false);
    setShowModal(false);
  };

  const id = 1; // El id que deseas usar para generar el QR, en este caso es estático
  const [tipo, setTipo] = useState("usuario"); // Cambia a "admin" para mostrar los botones

  return (
    <div className="card">
      <div className="card-body">
        <div className="left-column">
          <h3>Identificación</h3>
          <div className="form-group">
            <label htmlFor="curp">CURP</label>
            <input
              type="text"
              id="curp"
              name="curp"
              value={editedData ? editedData.curp : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre y Apellidos</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={editedData ? editedData.nombre : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <h3>Domicilio</h3>
          <div className="form-group">
            <label htmlFor="calleNumero">Calle y Número</label>
            <input
              type="text"
              id="calleNumero"
              name="calleNumero"
              value={editedData ? editedData.domicilio : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="colonia">Colonia/Localidad</label>
            <input
              type="text"
              id="colonia"
              name="colonia"
              value={editedData ? editedData.colonia : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="municipio">Municipio o Alcaldía</label>
            <input
              type="text"
              id="municipio"
              name="municipio"
              value={editedData ? editedData.municipio : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="codigoPostal">Código Postal</label>
            <input
              type="text"
              id="codigoPostal"
              name="codigoPostal"
              value={editedData ? editedData.codigoPostal : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="entidadFederativa">Entidad Federativa</label>
            <input
              type="text"
              id="entidadFederativa"
              name="entidadFederativa"
              value={editedData ? editedData.entidadFederativa : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="right-column">
          <h3>Lugar y Fecha de Nacimiento</h3>
          <div className="form-group">
            <label htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
            <input
              type="text"
              id="lugarNacimiento"
              name="lugarNacimiento"
              value={editedData ? editedData.lugarNacimiento : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={editedData ? editedData.fechaNacimiento : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          {/* Aquí añadimos el código QR */}
          <div className="qr-code-container" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h4>QR de la Cartilla</h4>
            <QRCode value={`${id}`} />
          </div>
        </div>
      </div>

      {tipo !== "usuario" && (
        <button className="edit-button" onClick={isEditing ? saveChanges : handleEdit}>
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      )}

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

const App = () => {
  const userData = {
    curp: 'ABCD123456HDFLRN01',
    nombre: 'Juan Pérez López',
    afiliacion: '1234567890',
    domicilio: 'Calle Falsa 123',
    colonia: 'Centro',
    municipio: 'Ciudad de México',
    codigoPostal: '01000',
    entidadFederativa: 'Ciudad de México',
    lugarNacimiento: 'Ciudad de México',
    fechaNacimiento: '1990-01-01',
    tipo: 'administrador',
  };

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <EscanearDatos userData={userData} />
    </div>
  );
};

export default App;
