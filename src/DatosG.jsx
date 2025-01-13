import React from 'react';
import './DatosG.css';
import QRCode from 'react-qr-code'; // Importamos la librería

const EscanearDatos = ({ userData }) => {

  console.log('userData desde datos generales: ', userData)

  const id = userData.id; // El id que deseas usar para generar el QR

  return (
    <div className="card">
      <div className="card-body">
        <div className="left-column">
          
          <h3>Identificación</h3>
          <div className="form-group">
            <label htmlFor="curp">CURP</label>
            <input type="text" id="curp" name="curp" value={userData ? userData.curp : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={userData ? `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}` : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="afiliacion">No. de Afiliación</label>
            <input type="text" id="afiliacion" name="afiliacion" value={userData ? userData.afiliacion : ''} readOnly />
          </div>

          <h3>Domicilio</h3>
          <div className="form-group">
            <label htmlFor="calleNumero">Calle y Número</label>
            <input type="text" id="calleNumero" name="calleNumero" value={userData ? userData.domicilio : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="colonia">Colonia/Localidad</label>
            <input type="text" id="colonia" name="colonia" value={userData ? userData.Asentamiento.d_asenta : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="municipio">Municipio o Alcaldía</label>
            <input type="text" id="municipio" name="municipio" value={userData ? userData.Asentamiento.D_mnpio : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="codigoPostal">Código Postal</label>
            <input type="text" id="codigoPostal" name="codigoPostal" value={userData ? userData.Asentamiento.d_codigo : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="entidadFederativa">Entidad Federativa</label>
            <input type="text" id="entidadFederativa" name="entidadFederativa" value={userData ? userData.Asentamiento.d_estado  : ''} readOnly />
          </div>
        </div>

        <div className="right-column">
          <h3>Lugar y Fecha de Nacimiento</h3>
          <div className="form-group">
            <label htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
            <input type="text" id="lugarNacimiento" name="lugarNacimiento" value={userData ? userData.lugarNacimiento : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={userData ? userData.fechaNacimiento : ''} readOnly />
          </div>

          {/* Aquí añadimos el código QR */}
          <div className="qr-code-container" style={{ marginTop: '20px', textAlign: 'center' }}>
            <h4>QR de la Cartilla</h4>
            <QRCode value={`${id}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = ({userData}) => {

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <EscanearDatos userData={userData} />
    </div>
  );
};

export default App;
