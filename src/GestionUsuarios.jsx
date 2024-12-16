import React, { useState } from 'react';
import './GestionUsuarios.css'; // Archivo CSS para estilos

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'García', edad: 30, genero: 'Masculino', tipoSangre: 'O+', correo: 'juan.perez@example.com' },
    { id: 2, nombre: 'Ana', apellidoPaterno: 'López', apellidoMaterno: 'Gómez', edad: 28, genero: 'Femenino', tipoSangre: 'A+', correo: 'ana.lopez@example.com' },
    { id: 3, nombre: 'Carlos', apellidoPaterno: 'Ramírez', apellidoMaterno: 'Vázquez', edad: 35, genero: 'Masculino', tipoSangre: 'B+', correo: 'carlos.ramirez@example.com' },
    { id: 4, nombre: 'Lucía', apellidoPaterno: 'Martínez', apellidoMaterno: 'Sánchez', edad: 25, genero: 'Femenino', tipoSangre: 'O-', correo: 'lucia.martinez@example.com' },
    // Agrega más usuarios si es necesario para probar la paginación
  ]);

  const [formData, setFormData] = useState({
    id: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', edad: '', genero: '', tipoSangre: '', correo: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = () => {
    if (formData.nombre && formData.correo) {
      const nuevoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno,
        edad: formData.edad,
        genero: formData.genero,
        tipoSangre: formData.tipoSangre,
        correo: formData.correo,
      };
      setUsuarios([...usuarios, nuevoUsuario]);
      setFormData({ id: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', edad: '', genero: '', tipoSangre: '', correo: '' });
    }
  };

  const handleEditUser = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    setFormData(usuario);
    setEditMode(true);
  };

  const handleUpdateUser = () => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === formData.id ? { ...u, ...formData } : u
      )
    );
    setFormData({ id: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', edad: '', genero: '', tipoSangre: '', correo: '' });
    setEditMode(false);
  };

  const handleDeleteUser = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando cambie la búsqueda
  };

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario.correo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);

  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="gestion-usuarios">
      <h2>Gestión de Usuarios</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar usuario por nombre o correo"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="form-container">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="apellidoPaterno"
          placeholder="Apellido Paterno"
          value={formData.apellidoPaterno}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="apellidoMaterno"
          placeholder="Apellido Materno"
          value={formData.apellidoMaterno}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genero"
          placeholder="Género"
          value={formData.genero}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="tipoSangre"
          placeholder="Tipo de Sangre"
          value={formData.tipoSangre}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formData.correo}
          onChange={handleInputChange}
        />
        {editMode ? (
          <button className="editar" onClick={handleUpdateUser}>Actualizar</button>
        ) : (
          <button className="agregar" onClick={handleAddUser}>Agregar</button>
        )}
      </div>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Tipo de Sangre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellidoPaterno}</td>
              <td>{usuario.apellidoMaterno}</td>
              <td>{usuario.edad}</td>
              <td>{usuario.genero}</td>
              <td>{usuario.tipoSangre}</td>
              <td>{usuario.correo}</td>
              <td>
                <button className="editar" onClick={() => handleEditUser(usuario.id)}>Editar</button>
                <button className="eliminar" onClick={() => handleDeleteUser(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          Primero
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Último
        </button>
      </div>
    </div>
  );
};

export default GestionUsuarios;
