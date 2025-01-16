import React, { useState, useEffect } from 'react';
import logo from './assets/Logo.png';
import './RegistrarP.css';
import clienteAxios from './config/axios';

const RegistroUsuarioP = () => {
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
                localStorage.setItem('cartillaUserData', JSON.stringify(respuesta.data.paciente));
                console.log('Registro exitoso: ', respuesta.data.paciente);
                alert('Registro exitoso');
            } else {
                console.log('Error en el registro: ', respuesta.data);
                alert('Error en el registro' );
            }
        }
        catch (error) {
            console.log(error);
        }

        window.history.back();
    };

    return (
        <div className="form-container">
            <div>
                <h2>Registro de Pacientes</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-left">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Ingresa el nombre del paciente"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="apellidoPaterno">Apellido Paterno</label>
                        <input
                            type="text"
                            id="apellidoPaterno"
                            name="apellidoPaterno"
                            placeholder="Ingresa el apellido paterno del paciente"
                            value={formData.apellidoPaterno}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="apellidoMaterno">Apellido Materno</label>
                        <input
                            type="text"
                            id="apellidoMaterno"
                            name="apellidoMaterno"
                            placeholder="Ingresa el apellido materno del paciente"
                            value={formData.apellidoMaterno}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ingresa el correo electrónico del paciente"
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
                            placeholder="Ingresa el CURP del paciente"
                            value={formData.curp}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-right">
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

                        <label htmlFor="domicilio">Calle y número exterior</label>
                        <input
                            type="text"
                            id="domicilio"
                            name="domicilio"
                            placeholder="Ingresa la calle y número exterior del paciente"
                            value={formData.domicilio}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="codigoPostal">Código Postal</label>
                        <input
                            type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            placeholder="Código Postal"
                            value={formData.codigoPostal}
                            onChange={handleChange}
                            required
                        />

                        {formData.codigoPostal.length > 4 && colonias.length > 0 && (
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
                                        <option key={colonia.id} value={colonia.id}>
                                            {colonia.d_asenta}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

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
                            placeholder="Ingresa el lugar de nacimiento del paciente"
                            value={formData.lugarNacimiento}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="login-button">
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
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

export default RegistroUsuarioP;
