import React from 'react';
import './DatosG.css';

const EscanearDatos = ({ userData }) => {
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
            <label htmlFor="nombre">Nombre y Apellidos</label>
            <input type="text" id="nombre" name="nombre" value={userData ? userData.nombre : ''} readOnly />
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
            <input type="text" id="colonia" name="colonia" value={userData ? userData.colonia : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="municipio">Municipio o Alcaldía</label>
            <input type="text" id="municipio" name="municipio" value={userData ? userData.municipio : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="codigoPostal">Código Postal</label>
            <input type="text" id="codigoPostal" name="codigoPostal" value={userData ? userData.codigoPostal : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="entidadFederativa">Entidad Federativa</label>
            <input type="text" id="entidadFederativa" name="entidadFederativa" value={userData ? userData.entidadFederativa : ''} readOnly />
          </div>
        </div>

        <div className="right-column">
          <h3>Lugar y Fecha de Nacimiento</h3>
          <div className="form-group">
            <label htmlFor="lugarNacimiento">Municipio o Alcaldía</label>
            <input type="text" id="lugarNacimiento" name="lugarNacimiento" value={userData ? userData.lugarNacimiento : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="entidadFederativaNacimiento">Entidad Federativa</label>
            <input type="text" id="entidadFederativaNacimiento" name="entidadFederativaNacimiento" value={userData ? userData.entidadFederativa : ''} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={userData ? userData.fechaNacimiento : ''} readOnly />
          </div>
        </div>
      </div>
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
  };

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <EscanearDatos userData={userData} />
    </div>
  );
};

export default App;
