import React, { useState } from "react";
import './Tabla.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const AtencionM = () => {
  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('citas desde atencion: ', cartilla.cita);
  const rows = cartilla.cita;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [tipo, setTipo] = useState("usuario"); // Cambia a "admin" para mostrar los botones
  // const [rows, setRows] = useState([
  //   { id: 1, hora: "09:00 AM", servicio: "Consulta general", rubrica: "CG-123" },
  //   { id: 2, hora: "10:30 AM", servicio: "Chequeo de salud", rubrica: "CH-456" },
  //   { id: 3, hora: "02:00 PM", servicio: "Revisión de vacunación", rubrica: "RV-789" },
  //   { id: 4, hora: "11:15 AM", servicio: "Consulta nutricional", rubrica: "CN-101" },
  // ]);
  
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isNewRow, setIsNewRow] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const handleEdit = (row) => {
    setEditMode(true);
    setEditedRow({ ...row });
    setIsNewRow(false);
  };

  const handleAddNewRow = () => {
    setEditMode(true);
    setEditedRow({
      id: rows.length + 1,
      hora: "",
      servicio: "",
      rubrica: "",
    });
    setIsNewRow(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({
      ...editedRow,
      [name]: value,
    });
  };

  const confirmSave = () => {
    if (isNewRow) {
      setRows([...rows, editedRow]);
    } else {
      const updatedRows = rows.map((row) =>
        row.id === editedRow.id ? editedRow : row
      );
      setRows(updatedRows);
    }
    setShowModal(false);
    setEditMode(false);
  };

  const cancelSave = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const handleDelete = (rowId) => {
    setRowToDelete(rowId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setRows(rows.filter((row) => row.id !== rowToDelete));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setRowToDelete(null);
    setShowModal(false);
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hora</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Clave</TableCell>
              {tipo !== "usuario" && (
                <TableCell>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id ? row.id : '-'}>
                <TableCell>{row.horario ? row.horario : '-'}</TableCell>
                <TableCell>{row.servicio ? row.servicio : '-'}</TableCell>
                <TableCell>{row.clave ? row.clave : '-'}</TableCell>
                {tipo !== "usuario" && (
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {tipo !== "usuario" && (
          <Button variant="contained" onClick={handleAddNewRow}>
            Agregar Nuevo
          </Button>
        )}
      </TableContainer>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            {rowToDelete ? (
              <>
                <h3>Confirmar Eliminación</h3>
                <p>¿Estás seguro de que deseas eliminar este registro?</p>
                <div className="modal-buttons">
                  <button className="confirm-button" onClick={confirmDelete}>Eliminar</button>
                  <button className="cancel-button" onClick={cancelDelete}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <h3>Confirmar Cambios</h3>
                <p>¿Estás seguro de que deseas guardar los cambios?</p>
                <div className="modal-buttons">
                  <button className="confirm-button" onClick={confirmSave}>Confirmar</button>
                  <button className="cancel-button" onClick={cancelSave}>Cancelar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {editMode && (
        <div className="edit-form">
          <TextField
            placeholder="Hora"
            name="hora"
            value={editedRow.hora}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Servicio"
            name="servicio"
            value={editedRow.servicio}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Clave"
            name="rubrica"
            value={editedRow.rubrica}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            <Button className="confirm-button" onClick={confirmSave}>
              Guardar cambios
            </Button>
            <Button className="cancel-button" onClick={cancelSave}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtencionM;
