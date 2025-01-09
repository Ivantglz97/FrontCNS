import React, { useState } from 'react';
import logo from './assets/Logo.png';
import './Login.css';

const OlvidasteContrasena = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica para enviar el correo de restablecimiento
        console.log(`Correo enviado a: ${email}`);
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
                    Volver
                </button>
            </div>
        </div>
    );
};

export default OlvidasteContrasena;
