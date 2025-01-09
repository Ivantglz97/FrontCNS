import React, { useState } from 'react';
import './Login.css';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        password: '',
        curp: '',
        tipoSangre: '',
        domicilio: '',
        fechaNacimiento: '',
        genero: '',
        lugarNacimiento: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para registrar al usuario
        console.log('Datos enviados:', formData);
    };

    return (
        <div className="login-container">
            <div className="left-section">
                <h1>Registro de Usuario</h1>
                <p>Por favor, completa el formulario para registrarte.</p>
            </div>
            <div className="right-section">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                    <input
                        type="text"
                        id="apellidoPaterno"
                        name="apellidoPaterno"
                        placeholder="Ingresa tu apellido paterno"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="apellidoMaterno">Apellido Materno</label>
                    <input
                        type="text"
                        id="apellidoMaterno"
                        name="apellidoMaterno"
                        placeholder="Ingresa tu apellido materno"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Crea una contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="curp">CURP</label>
                    <input
                        type="text"
                        id="curp"
                        name="curp"
                        placeholder="Ingresa tu CURP"
                        value={formData.curp}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="tipoSangre">Tipo de Sangre</label>
                    <input
                        type="text"
                        id="tipoSangre"
                        name="tipoSangre"
                        placeholder="Ingresa tu tipo de sangre"
                        value={formData.tipoSangre}
                        onChange={handleChange}
                    />

                    <label htmlFor="domicilio">Domicilio</label>
                    <input
                        type="text"
                        id="domicilio"
                        name="domicilio"
                        placeholder="Ingresa tu domicilio"
                        value={formData.domicilio}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="genero">Género</label>
                    <select
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label htmlFor="lugarNacimiento">Lugar de Nacimiento</label>
                    <input
                        type="text"
                        id="lugarNacimiento"
                        name="lugarNacimiento"
                        placeholder="Ingresa tu lugar de nacimiento"
                        value={formData.lugarNacimiento}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="login-button">
                        Registrarse
                    </button>
                    <button className="back-button" onClick={() => window.history.back()}>
                    Volver
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistroUsuario;
