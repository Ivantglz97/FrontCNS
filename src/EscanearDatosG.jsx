import React, { useState, useRef } from 'react';
import './EscanearDatosG.css'

import { BrowserMultiFormatReader } from '@zxing/library'; // Importar la librería de QR

// Datos estáticos para usuarios con ID 1 y 2
const usuarios = [
  {
    id: 1,
    nombre: 'Ivan Trejo Gonzalez',
    apellido: 'Trejo Gonzalez',
    curp: 'TREJIVAN123',
    afiliacion: 'A1234567',
    domicilio: 'Calle Falsa 123',
    colonia: 'Colonia Ficticia',
    municipio: 'Alcaldía Central',
    codigoPostal: '01000',
    entidadFederativa: 'CDMX',
    lugarNacimiento: 'CDMX',
    fechaNacimiento: '1990-01-01',
  },
  {
    id: 2,
    nombre: 'Ana Lopez Martinez',
    apellido: 'Lopez Martínez',
    curp: 'LOPEZANA123',
    afiliacion: 'B1234567',
    domicilio: 'Avenida Siempre Viva 456',
    colonia: 'Barrio Alto',
    municipio: 'Alcaldía Norte',
    codigoPostal: '02000',
    entidadFederativa: 'Edo. Mex.',
    lugarNacimiento: 'Edo. Mex.',
    fechaNacimiento: '1995-02-15',
  },
];

const DatosG = () => {
  const [qrData, setQrData] = useState(null); // Datos escaneados del QR
  const [userData, setUserData] = useState(null); // Datos del usuario según ID leído
  const [isCameraActive, setIsCameraActive] = useState(false); // Estado para controlar si la cámara está activa
  const videoRef = useRef(null); // Referencia al video de la cámara
  const codeReader = useRef(null); // Referencia para el lector de códigos QR

  const handleScan = (data) => {
    if (data) {
      const id = data.getText(); // Extraer el texto (ID) del código QR
      setQrData(id); // Guardar el ID escaneado
      const usuario = usuarios.find((user) => user.id.toString() === id); // Buscar el usuario con ese ID
      if (usuario) {
        setUserData(usuario); // Cargar los datos del usuario correspondiente
      } else {
        setUserData(null); // Si no se encuentra el ID, limpiar los datos
      }
    }
  };

  const handleError = (err) => {
    console.error(err); // Manejar errores si ocurren
  };

  // Función para iniciar la cámara y leer el código QR
  const startScanner = () => {
    codeReader.current = new BrowserMultiFormatReader(); // Crear lector de códigos
    codeReader.current
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) {
          handleScan(result);
        }
        if (error) {
          handleError(error);
        }
      })
      .catch((err) => {
        console.error('Error starting scanner:', err);
      });

    setIsCameraActive(true); // Marcar la cámara como activa
  };

  // Función para detener la cámara
  const stopScanner = () => {
    if (codeReader.current) {
      codeReader.current.reset(); // Detener el lector de QR
    }
    setIsCameraActive(false); // Marcar la cámara como inactiva
    setQrData(null); // Limpiar los datos escaneados
    setUserData(null); // Limpiar los datos del usuario
  };

  // Iniciar el lector al cargar el componente
  React.useEffect(() => {
    if (isCameraActive) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner(); // Limpiar cuando el componente se desmonta
    };
  }, [isCameraActive]);

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


                  <div className="qr-card">
                  <h2>Escanear Código QR</h2>
                  {!isCameraActive ? (
                    <button className="start-camera-button" onClick={startScanner}>Iniciar Cámara</button>
                  ) : (
                    <div>
                      <div className="qr-container">
                        <video ref={videoRef} style={{ width: '100%' }} />
                      </div>
                      <button className="stop-camera-button" onClick={stopScanner}>Detener Cámara</button>
                    </div>
                  )}
                  
                </div>

                </div>

              </div>
            


    </div>
  );
};

export default DatosG;
