import React, { useState } from 'react';
import logo from './assets/Logo.png';
import './Login.css';
import clienteAxios from './config/axios';

const OlvidasteContrasena = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica para enviar el correo de restablecimiento
        
        try {
            const respuesta = clienteAxios.post('/usuario/reset-password', {email} );
            console.log('Respuesta: ', respuesta);
            alert('Se ha enviado un correo para restablecer tu contraseña.');
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
        
        window.history.back();
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <img src={logo} alt="Logo" className="logo-image" />
                <h1>¿Olvidaste tu contraseña?</h1>
                <p>Por favor, ingresa tu correo electrónico para restablecer tu contraseña.</p>
            </div>
            <div className="right-section">
                <h2>Restablecer Contraseña</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-button">
                        Restablecer Contraseña
                    </button>
                </form>
                <button className="back-button" onClick={() => window.history.back()}>
                    Regresar
                </button>
            </div>
        </div>
    );
};

export default OlvidasteContrasena;
