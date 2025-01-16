import React, { useState, useEffect } from 'react';
import logo from './assets/Logo.png';
import './Login.css';
import clienteAxios from './config/axios';

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
        codigoPostal: '',
        domicilioId: '',
        fechaNacimiento: '',
        genero: '',
        lugarNacimiento: ''
    });

    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const [colonias, setColonias] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        if (formData.codigoPostal.length === 5) {
            clienteAxios.get(`/personal/domicilios/${formData.codigoPostal}`)
            .then(response => {
                setColonias(response.data);
            })
            .catch(error => {
                console.error('Error fetching colonias:', error);
            });
        }
    }, [formData.codigoPostal]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const respuesta = await clienteAxios.post('/personal/registrar-paciente', formData);
            console.log('Forma Data: ', formData);
            
            if (respuesta.data.mensaje === 'Se agrego un nuevo paciente') {
                console.log('Registro exitoso: ', respuesta.data.paciente);
                alert('Registro exitoso');
                window.history.back();
            } else {
                console.log('Error en el registro: ', respuesta.data.errors);
                alert('Error en el registro' );
            }
            console.log('Datos enviados:', formData);
        }
        catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="login-container">
            <div className="left-section">
            <img src={logo} alt="Logo" className="logo-image" />
                <h1>Registro de Usuario</h1>
                <p>Por favor, completa el formulario para registrarte.</p>
                <button className="back-button" onClick={() => window.history.back()}>
                    Regresar
                    </button>
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

                    <div className="form-row"> 
                        <div className='form-group'>
                            <label htmlFor='tipoSangre'>Tipo de Sangre</label>
                            <select 
                                name="tipoSangre" 
                                id="tipoSangre" 
                                value={formData.tipoSangre}
                                onChange={handleChange} required>
                                <option>Seleccione una opción </option>
                                <option>O-</option>
                                <option>O+</option>
                                <option>A-</option>
                                <option>A+</option>
                                <option>AB-</option>
                                <option>AB+</option>
                            </select>
                        </div>

                    </div>

                    <label htmlFor="domicilio">Calle y numero exterior</label>
                    <input
                        type="text"
                        id="domicilio"
                        name="domicilio"
                        placeholder="Ingresa tu calle y numero exterior"
                        value={formData.domicilio}
                        onChange={handleChange}
                        required
                    />
                    
                    <div>
                        <label htmlFor="codigoPostal">Código Postal</label>
                        <input
                            type="text"
                            maxLength={5}
                            minLength={5}
                            id="codigoPostal"
                            name="codigoPostal"
                            placeholder="Código Postal"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                            required
                        />

                        <div className='form-row'>

                        {formData.codigoPostal.length > 4 && colonias.length > 0 &&  (
                            <div className="form-group">
                                <label htmlFor="colonia">Colonia</label>
                                <select
                                    id="colonia"
                                    name="domicilioId"
                                    value={formData.domicilioId}
                                    onChange={handleChange}
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


                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                        type="date"
                            id="fechaNacimiento"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                            />
                        
                    <div className="form-row">
                    <div className="form-group">  
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
                            </div>
                    </div>

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

                    <button type="submit" className="login-button" >
                        Registrarse
                    </button>
                </form>
            </div>
                        {/* Modal de confirmación */}
                        {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirmar Datos Ingresados</h3>
                        <p>¿Son los datos correctos?</p>
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

export default RegistroUsuario;
