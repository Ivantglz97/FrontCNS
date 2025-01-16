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
  Typography,
  IconButton,
} from "@mui/material";
// import clienteAxios from "./config/axios";
import { Edit, Delete } from "@mui/icons-material";

const Antecedentes = ({userData, datosPaciente}) => {
  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  const antecedente = cartilla?.antecedente || {};

  const [tipo, setTipo] = useState(userData.tipo || 'paciente'); // Cambia a "admin" para mostrar los botones

  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isNewRow, setIsNewRow] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  console.log('Tipo usuario desde Antecedente: ', tipo)

  const handleEdit = (row) => {
    setEditMode(true);
    setEditedRow({ ...row });
    setIsNewRow(false);
  };

  const handleAddNewRow = () => {
    setEditMode(true);
    setEditedRow({
      id: rows.length + 1,
      alergias: "",
      discapacidad: "",
      cancer: "",
      cirugias: "",
      diabetes: "",
      transfusiones: "",
      otros: "",
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
              <TableCell>Alergias</TableCell>
              <TableCell>Discapacidad</TableCell>
              <TableCell>Cáncer</TableCell>
              <TableCell>Cirugías</TableCell>
              <TableCell>Diabetes</TableCell>
              <TableCell>Transfusiones</TableCell>
              <TableCell>Otros</TableCell>
              {tipo !== "paciente" && (
              <TableCell>Acciones</TableCell>
            )}
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow key={antecedente?.id}>
                <TableCell>{(antecedente?.alergias ? antecedente.alergias : '-')}</TableCell>
                <TableCell>{antecedente?.discapacidad ? antecedente.discapacidad : '-'}</TableCell>
                <TableCell>{antecedente?.cancer ? antecedente.cancer : '-'}</TableCell>
                <TableCell>{antecedente?.cirugias ? antecedente.cirugias : '-'}</TableCell>
                <TableCell>{antecedente?.diabetes ? antecedente.diabetes : '-'}</TableCell>
                <TableCell>{antecedente?.transfusiones ? antecedente.transfusiones : '-'}</TableCell>
                <TableCell>{antecedente?.otros ? antecedente.otros : '-'}</TableCell>
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
            placeholder="Alergias"
            name="alergias"
            value={editedRow.alergias}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Discapacidad"
            name="discapacidad"
            value={editedRow.discapacidad}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Cáncer"
            name="cancer"
            value={editedRow.cancer}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Cirugías"
            name="cirugias"
            value={editedRow.cirugias}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Diabetes"
            name="diabetes"
            value={editedRow.diabetes}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Transfusiones"
            name="transfusiones"
            value={editedRow.transfusiones}
            onChange={handleInputChange}
          />
          <TextField
            placeholder="Otros"
            name="otros"
            value={editedRow.otros}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
          <Button className="confirm-button"  onClick={() => setShowModal(true)} >
            Guardar cambios
          </Button>
          <Button className="cancel-button" onClick={() => setEditMode(false)} >
            Cancelar
          </Button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Antecedentes;
