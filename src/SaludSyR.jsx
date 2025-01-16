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

const SaludSyR = ({userData, datosPaciente}) => {
  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('salud desde salud: ', cartilla.saludSexuals);
  const rows = cartilla?.saludSexuals || [{}];

  const [tipo, setTipo] = useState(userData.tipo || 'paciente'); // Cambia a "admin" para mostrar los botones
  // const [rows, setRows] = useState([
  //   { id: 1, accion: "Otorgamiento de preservativo masculino", fecha: "2023-01-01", tipo: "Otorgamiento método anticonceptivo", observaciones: "Paciente recibió método anticonceptivo" },
  //   { id: 2, accion: "Consulta médica", fecha: "2023-02-05", tipo: "Consulta general", observaciones: "Paciente con síntomas de resfriado" },
  //   { id: 3, accion: "Vacunación", fecha: "2023-03-10", tipo: "Vacuna contra la gripe", observaciones: "Paciente vacunado con éxito" },
  //   { id: 4, accion: "Chequeo de salud", fecha: "2023-04-15", tipo: "Chequeo general", observaciones: "Exámenes en proceso" },
  // ]);

  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [isNewRow, setIsNewRow] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      accion: "",
      fecha: "",
      tipo: "",
      observaciones: "",
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
              <TableCell>Acción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Observaciones</TableCell>
              {tipo !== "paciente" && (
              <TableCell>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id ? row.id : '-'}>
                <TableCell>{row.accion ? row.accion : '-'}</TableCell>
                <TableCell>{row.fecha ? row.fecha : '-'}</TableCell>
                <TableCell>{row.tipo ? row.tipo : '-'}</TableCell>
                <TableCell>{row.observaciones ? row.observaciones : '-'}</TableCell>
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
            placeholder="Acción"
            name="accion"
            value={editedRow.accion}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Fecha"
            name="fecha"
            value={editedRow.fecha}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Tipo"
            name="tipo"
            value={editedRow.tipo}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Observaciones"
            name="observaciones"
            value={editedRow.observaciones}
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

export default SaludSyR;
