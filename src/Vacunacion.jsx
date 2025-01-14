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

const Vacunacion = () => {
  const [tipo, setTipo] = useState("usuario"); // Cambia a "admin" para mostrar los botones
  const [rows, setRows] = useState([
    { id: 1, vacuna: "Cancino", dosis: "Anual", fecha: "12/11/24", lote: "A123" },
    { id: 2, vacuna: "Td", dosis: "Segunda", fecha: "13/03/22", lote: "B456" },
    { id: 3, vacuna: "Influenza", dosis: "Unica", fecha: "23/11/21", lote: "C789" },
    { id: 4, vacuna: "Hepatitis B", dosis: "Primera", fecha: "25/01/21", lote: "D012" },
  ]);

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
      vacuna: "",
      dosis: "",
      fecha: "",
      lote: "",
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
              <TableCell>Vacuna</TableCell>
              <TableCell>Dosis</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Lote</TableCell>
              {tipo !== "usuario" && (
              <TableCell>Acciones</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.vacuna}</TableCell>
                <TableCell>{row.dosis}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.lote}</TableCell>
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
          Agregar Nueva Vacuna
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
            placeholder="Vacuna"
            name="vacuna"
            value={editedRow.vacuna}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Dosis"
            name="dosis"
            value={editedRow.dosis}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Fecha"
            name="fecha"
            value={editedRow.fecha}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Lote"
            name="lote"
            value={editedRow.lote}
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

export default Vacunacion;
