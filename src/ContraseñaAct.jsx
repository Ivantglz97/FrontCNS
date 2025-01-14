import React, { useState, useEffect } from 'react';
import logo from './assets/Logo.png';
import './Login.css';

const ContraseñaCambiadaExitosamente = () => {
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        // Aquí iría la lógica para obtener el mensaje del backend
        // Este es un ejemplo estático, puedes reemplazarlo por una respuesta real
        setMensaje('Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.');
    }, []);

    return (
        <div className="login-container">
            <div className="left-section">
                <img src={logo} alt="Logo" className="logo-image" />
                <h1>Contraseña Cambiada Exitosamente</h1>
                <p>{mensaje}</p>
            </div>
            <div className="right-section">
                <button className="back-button" onClick={() => window.history.back()}>
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default ContraseñaCambiadaExitosamente;
