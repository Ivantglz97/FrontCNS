import React, { useState, useRef, useEffect } from 'react';
import './EscanearDatosG.css';
import { BrowserMultiFormatReader } from '@zxing/library'; // Importar la librería de QR

import clienteAxios from './config/axios';

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

const EscanearDatosG = () => {
  const [qrData, setQrData] = useState(null); // Datos escaneados del QR
  const [userData, setUserData] = useState(null); // Datos del usuario según ID leído
  const [isCameraActive, setIsCameraActive] = useState(false); // Estado para controlar si la cámara está activa
  const videoRef = useRef(null); // Referencia al video de la cámara
  const codeReader = useRef(null); // Referencia para el lector de códigos QR

  const handleScan = async (data) => {
    if (data) {
      const id = data.getText(); // Extraer el texto (ID) del código QR
      setQrData(id); // Guardar el ID escaneado

      let usuario = null;

      try {
        const respuesta = await clienteAxios.get(`/personal/ver-paciente/${id}`);

        usuario = respuesta.data;


      } catch (error) {
        console.error('Error al cargar datos:', error);
      }

      // const usuario = usuarios.find((user) => user.id.toString() === id); // Buscar el usuario con ese ID
      if (usuario) {
        console.log('Usuario encontrado desde EscanearDatosG: ', usuario);
        setUserData(usuario); // Cargar los datos del usuario correspondiente
      } else {
        setUserData(null); // Si no se encuentra el ID, limpiar los datos
      }
    }
  };

  const handleError = (err) => {
    console.error(err); // Manejar errores si ocurren
  };

  const startScanner = () => {
    codeReader.current = new BrowserMultiFormatReader(); // Crear lector de códigos
    codeReader.current
      .decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result) handleScan(result);
        if (error) handleError(error);
      })
      .catch((err) => console.error('Error starting scanner:', err));

    setIsCameraActive(true); // Activar la cámara
  };

  const stopScanner = () => {
    if (codeReader.current) codeReader.current.reset(); // Detener el lector de QR
    setIsCameraActive(false); // Desactivar la cámara
  };

  const clearData = () => {
    setQrData(null); // Limpiar datos escaneados
    setUserData(null); // Limpiar datos del usuario
  };

  useEffect(() => {
    if (isCameraActive) startScanner();
    else stopScanner();
    return () => stopScanner(); // Limpiar cuando el componente se desmonta
  }, [isCameraActive]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="left-column">
          <h3>Identificación</h3>
          {[{ label: 'CURP', id: 'curp', value: userData?.curp },
            // { label: 'Nombre y Apellidos', id: 'nombre', value: userData?.nombre && userData?.apellido && `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}` },
            { label: 'Nombre y Apellidos', id: 'nombre', value: `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}` },
          ].map(({ label, id, value }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input type="text" id={id} value={value || ''} readOnly />
            </div>
          ))}

          <h3>Domicilio</h3>
          {[{ label: 'Calle y Número', id: 'calleNumero', value: userData?.domicilio },
            { label: 'Colonia/Localidad', id: 'colonia', value: userData?.colonia },
            { label: 'Municipio o Alcaldía', id: 'municipio', value: userData?.municipio },
            { label: 'Código Postal', id: 'codigoPostal', value: userData?.codigoPostal },
            { label: 'Entidad Federativa', id: 'entidadFederativa', value: userData?.entidadFederativa },
          ].map(({ label, id, value }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input type="text" id={id} value={value || ''} readOnly />
            </div>
          ))}
        </div>

        <div className="right-column">
          <h3>Lugar y Fecha de Nacimiento</h3>
          {[{ label: 'Lugar de Nacimiento', id: 'lugarNacimiento', value: userData?.lugarNacimiento },
            { label: 'Fecha de Nacimiento', id: 'fechaNacimiento', value: userData?.fechaNacimiento },
          ].map(({ label, id, value }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                type={id === 'fechaNacimiento' ? 'date' : 'text'}
                id={id}
                value={value || ''}
                readOnly
              />
            </div>
          ))}

          <div className="qr-card">
            <h2>Escanear Código QR</h2>
            {!isCameraActive ? (
              <div>
                <button className="start-camera-button" onClick={startScanner}>
                  Iniciar Cámara
                </button>
                <button className="clear-data-button" onClick={clearData}>
                  Limpiar Datos
                </button>
              </div>
            ) : (
              <div>
                <div className="qr-container">
                  <video ref={videoRef} style={{ width: '100%' }} />
                </div>
                <button className="stop-camera-button" onClick={stopScanner}>
                  Detener Cámara
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscanearDatosG;
