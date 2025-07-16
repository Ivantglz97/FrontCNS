## Cambios a realizar
### Perfil pacientes:
 - [] Cambiar colores de boton de 'Guardar' y 'Cancelar' que salen cuando presionas editar

 import React, { useState, useEffect } from 'react';
import './DatosG.css';
import QRCode from 'react-qr-code'; // Importamos la librería
import clienteAxios from './config/axios';

const EscanearDatos = ({ userData, datosPaciente }) => {
  // console.log('userData desde DatosG: ', userData);
  
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedData, setEditedData] = useState({datosPaciente, Asentamiento: {d_codigo: '', d_asenta: '', D_mnpio: '', d_estado: ''}});
  const [colonias, setColonias] = useState([]);

  const handleEdit = () => setIsEditing(true);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const [parent, child] = name.split('.');

  //   if (child) {
  //     setEditedData((prevData) => ({
  //       ...prevData,
  //       [parent]: {
  //         ...prevData[parent],
  //         [child]: value
  //       }
  //     }));
  //   } else {
  //     setEditedData((prevData) => ({
  //       ...prevData,
  //       [name]: value
  //     }));
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Manejar campos anidados
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      // Manejar campos simples
      setEditedData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const saveChanges = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (editedData.datosPaciente.Asentamiento.d_codigo?.length === 5) {
        clienteAxios.get(`/personal/domicilios/${editedData.datosPaciente.Asentamiento.d_codigo}`)
        .then(response => {
            setColonias(response.data);
        })
        .catch(error => {
            console.error('Error fetching colonias:', error);
        });
    }
}, [editedData.datosPaciente.Asentamiento.d_codigo]);

  const confirmSave = async () => {
    try {
      const respuesta = await clienteAxios.put(`/personal/actualizar-paciente/${datosPaciente.id}`, {
        nombre: editedData.datosPaciente?.nombre !== datosPaciente.nombre ? editedData.datosPaciente?.nombre : datosPaciente.nombre,
        apellidoPaterno: editedData.datosPaciente?.apellidoPaterno !== datosPaciente.apellidoPaterno ? editedData.datosPaciente?.apellidoPaterno : datosPaciente.apellidoPaterno,
        apellidoMaterno: editedData.datosPaciente?.apellidoMaterno !== datosPaciente.apellidoMaterno ? editedData.datosPaciente?.apellidoMaterno : datosPaciente.apellidoMaterno,
        curp: editedData.datosPaciente?.curp !== datosPaciente.curp ? editedData.datosPaciente?.curp : datosPaciente.curp,
        domicilio: editedData.datosPaciente?.domicilio !== datosPaciente.domicilio ? editedData.datosPaciente?.domicilio : datosPaciente.domicilio,
        fechaNacimiento: editedData.datosPaciente?.fechaNacimiento !== datosPaciente.fechaNacimiento ? editedData.datosPaciente?.fechaNacimiento : datosPaciente.fechaNacimiento,
        lugarNacimiento: editedData.datosPaciente?.lugarNacimiento !== datosPaciente.lugarNacimiento ? editedData.datosPaciente?.lugarNacimiento : datosPaciente.lugarNacimiento,
        domicilioId: editedData.datosPaciente?.domicilioId !== datosPaciente.domicilioId ? editedData.datosPaciente?.domicilioId : datosPaciente.domicilioId,
      });

      console.log('Paciente actualizado:', respuesta);

      localStorage.setItem('pacienteData', JSON.stringify(editedData.datosPaciente));
    }
    catch (error) {
      alert('Hubo un error al guardar los cambios');
      console.log(error);
    }

    setIsEditing(false);
    setShowModal(false);
  };

  const cancelSave = () => {
    setEditedData(datosPaciente);
    setIsEditing(false);
    setShowModal(false);
  };


  const [tipo, setTipo] = useState(userData.tipo || 'paciente'); // Cambia a "admin" para mostrar los botones

  const id = datosPaciente.id; // El id que deseas usar para generar el QR
  console.log('editedData desde DatosG: ', editedData);
  // const codigoPostalLength = editedData.Asentamiento?.d_codigo?.length || 0;
  const codigoPostalLength = editedData.datosPaciente.Asentamiento.d_codigo?.length;
  // const codigoPostalLengt = datosPaciente.Asentamiento.d_codigo?.length;
  console.log('Longitud del código postal:', codigoPostalLength);
  // console.log('Longitud del código postal:', codigoPostalLengt);
  

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
              name="datosPaciente.curp"
              value={editedData ? editedData.datosPaciente?.curp : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            {isEditing ? (
              <>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="datosPaciente.nombre"
                  value={editedData ? editedData.datosPaciente?.nombre : ''}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  id="apellidoPaterno"
                  name="datosPaciente.apellidoPaterno"
                  value={editedData ? editedData.datosPaciente?.apellidoPaterno : ''}
                  onChange={handleInputChange}
                  placeholder="Apellido Paterno"
                />
                <input
                  type="text"
                  id="apellidoMaterno"
                  name="datosPaciente.apellidoMaterno"
                  value={editedData ? editedData.datosPaciente?.apellidoMaterno : ''}
                  onChange={handleInputChange}
                  placeholder="Apellido Materno"
                />
              </>
            ) : (
              <div>

                <label htmlFor="nombre">Nombre y Apellidos</label>
                <input
                type="text"
                id="nombre"
                name="datosPaciente.datosPaciente.nombre"
                value={editedData ? `${editedData.datosPaciente?.nombre} ${editedData.datosPaciente?.apellidoPaterno} ${editedData.datosPaciente?.apellidoMaterno}` : ''}
                readOnly
                />
              </div>
            )
          }

          </div>
          <h3>Domicilio</h3>
          <div className="form-group">
            <label htmlFor="calleNumero">Calle y Número</label>
            <input
              type="text"
              id="calleNumero"
              name="datosPaciente.domicilio"
              value={editedData ? editedData.datosPaciente?.domicilio : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="codigoPostal">Código Postal</label>
            <input
                type="text"
                maxLength={5}
                minLength={5}
                // id="Asentamiento.d_codigo"
                name="datosPaciente.Asentamiento.d_codigo"
                // placeholder="Código Postal"
                value={editedData ? editedData.datosPaciente.Asentamiento?.d_codigo : ''}
                readOnly={!isEditing}
                onChange={handleInputChange}
                required
            />

            <div className='form-row'>
              {
              editedData.datosPaciente.Asentamiento.d_codigo?.length > 4 && colonias.length > 0 && (
                <div className="form-group">
                  <label htmlFor="colonia">Colonia</label>
                  <select
                    id="colonia"
                    name="editedData.domicilioId"
                    value={editedData ? editedData.datosPaciente?.domicilioId : ''}
                    // onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  >
                    <option value="">Seleccione una colonia</option>
                    {colonias.map((colonia) => (
                      <option name="domicilioId" key={colonia.id} value={colonia.id}>
                        {colonia.d_asenta}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* <div className="form-group">
            <label htmlFor="colonia">Colonia/Localidad</label>
            <input
              type="text"
              id="colonia"
              name="datosPaciente.colonia"
              value={editedData ? editedData.datosPaciente.Asentamiento.d_asenta : ''}
              readOnly={true}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="municipio">Municipio o Alcaldía</label>
            <input
              type="text"
              id="municipio"
              name="datosPaciente.municipio"
              value={editedData ? editedData.datosPaciente?.Asentamiento.D_mnpio : ''}
              readOnly={true}
              onChange={handleInputChange}
            />
          </div>

          

          {/* <div className="form-group">
            <label htmlFor="codigoPostal">Código Postal</label>
            <input
              type="text"
              id="codigoPostal"
              name="codigoPostal"
              value={editedData ? editedData.datosPaciente.Asentamiento.d_codigo : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="entidadFederativa">Entidad Federativa</label>
            <input
              type="text"
              id="entidadFederativa"
              name="datosPaciente.entidadFederativa"
              value={editedData ? editedData.datosPaciente?.Asentamiento.d_estado : ''}
              readOnly={true}
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
              name="datosPaciente.lugarNacimiento"
              value={editedData ? editedData.datosPaciente?.lugarNacimiento : ''}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="datosPaciente.fechaNacimiento"
              value={editedData ? editedData.datosPaciente?.fechaNacimiento : ''}
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

      {tipo !== "paciente" && (
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

const App = ({userData, datosPaciente}) => {

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <EscanearDatos userData={userData} datosPaciente={datosPaciente}/>
    </div>
  );
};

export default App;
