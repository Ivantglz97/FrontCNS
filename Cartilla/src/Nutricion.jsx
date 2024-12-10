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

const Nutricion = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, fecha: "2024-12-05", hora: "09:00 AM", servicio: "Consulta general", rubrica: "CG-123" },
    { id: 2, fecha: "2024-12-10", hora: "10:30 AM", servicio: "Chequeo de salud", rubrica: "CH-456" },
    { id: 3, fecha: "2024-12-12", hora: "02:00 PM", servicio: "Revisión de vacunación", rubrica: "RV-789" },
    { id: 4, fecha: "2024-12-15", hora: "11:15 AM", servicio: "Consulta nutricional", rubrica: "CN-101" },
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
            <TableCell>Fecha</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Rúbrica o Clave</TableCell>
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
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.hora}</TableCell>
              <TableCell>{row.servicio}</TableCell>
              <TableCell>{row.rubrica}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Nutricion;