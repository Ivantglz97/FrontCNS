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
import { Edit, Delete } from "@mui/icons-material";

const Antecedentes = () => {

  const [tipo, setTipo] = useState("usuario"); // Cambia a "admin" para mostrar los botones

  const [rows, setRows] = useState([
    { 
      id: 1, 
      alergias: "Polen, Polvo, Insulina", 
      discapacidad: "Visual", 
      cancer: "Cáncer de colón", 
      cirugias: "Apendice", 
      diabetes: "Tipo II", 
      transfusiones: "Sanguínea (2024-09-24)", 
      otros: "Hipertensión" 
    },
    { 
      id: 2, 
      alergias: "Pescado, Látex", 
      discapacidad: "Auditiva", 
      cancer: "Melanoma", 
      cirugias: "Rodilla", 
      diabetes: "Tipo I", 
      transfusiones: "Plasma (2023-11-10)", 
      otros: "Asma" 
    },
    { 
      id: 3, 
      alergias: "Cacahuates, Gatos", 
      discapacidad: "Motora", 
      cancer: "Leucemia", 
      cirugias: "Coronaria", 
      diabetes: "Pre-diabetes", 
      transfusiones: "Sanguínea (2024-05-15)", 
      otros: "Epilepsia" 
    },
    { 
      id: 4, 
      alergias: "Huevo, Polvo", 
      discapacidad: "Cognitiva", 
      cancer: "Cáncer de mama", 
      cirugias: "Cadera", 
      diabetes: "Tipo II", 
      transfusiones: "Sanguínea (2022-08-30)", 
      otros: "Obesidad" 
    },
  ]);
  
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
              {tipo !== "usuario" && (
              <TableCell>Acciones</TableCell>
            )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.alergias}</TableCell>
                <TableCell>{row.discapacidad}</TableCell>
                <TableCell>{row.cancer}</TableCell>
                <TableCell>{row.cirugias}</TableCell>
                <TableCell>{row.diabetes}</TableCell>
                <TableCell>{row.transfusiones}</TableCell>
                <TableCell>{row.otros}</TableCell>
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
