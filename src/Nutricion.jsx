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
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Nutricion = ({userData, datosPaciente}) => {
  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  // console.log('nutricion desde nutricion: ', cartilla.nutricions);
  const rows = cartilla?.nutricions || [{}];

  const [tipo, setTipo] = useState(userData.tipo || 'paciente'); // Cambia a "admin" para mostrar los botones
  // const [rows, setRows] = useState([
  //   { id: 1, fecha: "2024-12-01", peso: 68, estatura: 1.75 },
  //   { id: 2, fecha: "2024-12-05", peso: 85, estatura: 1.70 },
  //   { id: 3, fecha: "2024-12-10", peso: 95, estatura: 1.68 },
  //   { id: 4, fecha: "2024-12-15", peso: 55, estatura: 1.60 },
  // ]);

  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [isNewRow, setIsNewRow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Función para calcular el IMC
  const calcularIMC = (peso, estatura) => {
    return (peso / (estatura * estatura)).toFixed(2);
  };

  const handleEdit = (row) => {
    setEditMode(true);
    setEditedRow({ ...row });
    setIsNewRow(false);
  };

  const handleAddNewRow = () => {
    setEditMode(true);
    setEditedRow({
      id: rows.length + 1,
      fecha: "",
      peso: "",
      estatura: "",
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
              <TableCell>Fecha</TableCell>
              <TableCell>Peso (kg)</TableCell>
              <TableCell>Estatura (m)</TableCell>
              <TableCell>IMC</TableCell>
              {tipo !== "paciente" && (
              <TableCell>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id ? row.id : '-'}>
                <TableCell>{row.fecha ? row.fecha : '-'}</TableCell>
                <TableCell>{row.peso ? row.peso : '-'}</TableCell>
                <TableCell>{row.estatura ? row.estatura : '-'}</TableCell>
                <TableCell>{calcularIMC(row.peso, row.estatura)}</TableCell>
                {tipo !== "paciente" && (
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
        {tipo !== "paciente" && (
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
                  <button className="confirm-button" onClick={confirmDelete}>
                    Eliminar
                  </button>
                  <button className="cancel-button" onClick={cancelDelete}>
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Confirmar Cambios</h3>
                <p>¿Estás seguro de que deseas guardar los cambios?</p>
                <div className="modal-buttons">
                  <button className="confirm-button" onClick={confirmSave}>
                    Confirmar
                  </button>
                  <button className="cancel-button" onClick={cancelSave}>
                    Cancelar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {editMode && (
        <div className="edit-form">
          <TextField
            placeholder="Fecha"
            name="fecha"
            value={editedRow.fecha}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Peso"
            name="peso"
            value={editedRow.peso}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Estatura"
            name="estatura"
            value={editedRow.estatura}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            <Button className="confirm-button" onClick={() => setShowModal(true)}>
              Guardar cambios
            </Button>
            <Button className="cancel-button" onClick={() => setEditMode(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nutricion;
