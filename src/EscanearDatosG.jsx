import React, { useState, useRef, useEffect } from 'react';
import './EscanearDatosG.css';
import { BrowserMultiFormatReader } from '@zxing/library'; // Importar la librería de QR

import clienteAxios from './config/axios';


const EscanearDatosG = () => {
  const paciente = JSON.parse(localStorage.getItem('pacienteData')) || 
  {
    Asentamiento: {
      d_asenta: '',
      D_mnpio: '',
      d_codigo: '',
      d_estado: '',
    }
  };

  const [qrData, setQrData] = useState(null); // Datos escaneados del QR
  const [pacienteData, setpacienteData] = useState(paciente || {}); // Datos del usuario según ID leído
  const [isCameraActive, setIsCameraActive] = useState(false); // Estado para controlar si la cámara está activa
  const videoRef = useRef(null); // Referencia al video de la cámara
  const codeReader = useRef(null); // Referencia para el lector de códigos QR

  const handleScan = async (data) => {
    if (data) {
      const id = data.getText(); // Extraer el texto (ID) del código QR
      setQrData(id); // Guardar el ID escaneado

      let pacient = null;

      try {
        const respuesta = await clienteAxios.get(`/personal/ver-paciente/${id}`);
        pacient = respuesta.data;

      } catch (error) {
        console.error('Error al cargar datos:', error);
      }

      if (pacient) {
        console.log('paciente encontrado desde EscanearDatosG: ', pacient);
        setpacienteData(pacient); // Cargar los datos del usuario correspondiente

        localStorage.setItem('pacienteData', JSON.stringify(pacient));

      } else {
        setpacienteData(null); // Si no se encuentra el ID, limpiar los datos
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
    setpacienteData(null); // Limpiar datos del usuario
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
          {[{ label: pacienteData?.tipo !== 'paciente'? 'Busqueda por CURP' : 'CURP', 
            id: 'curp', 
            value: pacienteData?.curp, 
            readOnly: true 
          },
          
          { label: 'Nombre y Apellidos', 
            id: 'nombre', 
            value: pacienteData?.nombre && pacienteData?.apellidoPaterno && `${pacienteData.nombre} ${pacienteData.apellidoPaterno} ${pacienteData.apellidoMaterno}`,
            readOnly: true
          },
          ].map(({ label, id, value, readOnly }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input type="text" id={id} value={value || ''} readOnly={readOnly} />
            </div>
          ))}

          <h3>Domicilio</h3>
          {[{ label: 'Calle y Número', id: 'calleNumero', value: pacienteData?.domicilio },
            { label: 'Colonia/Localidad', id: 'colonia', value: pacienteData?.Asentamiento.d_asenta },
            { label: 'Municipio o Alcaldía', id: 'municipio', value: pacienteData?.Asentamiento.D_mnpio },
            { label: 'Código Postal', id: 'codigoPostal', value: pacienteData?.Asentamiento.d_codigo },
            { label: 'Entidad Federativa', id: 'entidadFederativa', value: pacienteData?.Asentamiento.d_estado },
          ].map(({ label, id, value }) => (
            <div className="form-group" key={id}>
              <label htmlFor={id}>{label}</label>
              <input type="text" id={id} value={value || ''} readOnly />
            </div>
          ))}
        </div>

        <div className="right-column">
          <h3>Lugar y Fecha de Nacimiento</h3>
          {[{ label: 'Lugar de Nacimiento', id: 'lugarNacimiento', value: pacienteData?.lugarNacimiento },
            { label: 'Fecha de Nacimiento', id: 'fechaNacimiento', value: pacienteData?.fechaNacimiento },
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
