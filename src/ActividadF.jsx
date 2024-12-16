import React, { useState } from "react";
import './Tabla.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

const ActividadadF = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, tema: "Yoga matutino", fecha: "2024-12-05", accion: "Registrar asistencia" },
    { id: 2, tema: "Clase de pilates", fecha: "2024-12-10", accion: "Ver detalles" },
    { id: 3, tema: "Sesión de estiramiento", fecha: "2024-12-12", accion: "Registrar asistencia" },
    { id: 4, tema: "Caminata guiada", fecha: "2024-12-15", accion: "Ver detalles" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selected.length === rows.length}
                onChange={() =>
                  setSelected(selected.length === rows.length ? [] : rows.map((row) => row.id))
                }
              />
            </TableCell>
            <TableCell>Tema</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Acción</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                />
              </TableCell>
              <TableCell>{row.tema}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.accion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ActividadadF;
