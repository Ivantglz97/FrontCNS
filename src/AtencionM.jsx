import React, { useState } from "react";
import './Tabla.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AtencionM = () => {
  const rows = [
    { id: 1, hora: "09:00 AM", servicio: "Consulta general", rubrica: "CG-123" },
    { id: 2, hora: "10:30 AM", servicio: "Chequeo de salud", rubrica: "CH-456" },
    { id: 3, hora: "02:00 PM", servicio: "Revisión de vacunación", rubrica: "RV-789" },
    { id: 4, hora: "11:15 AM", servicio: "Consulta nutricional", rubrica: "CN-101" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Horario</TableCell>
            <TableCell>Servicio</TableCell>
            <TableCell>Clave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
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

export default AtencionM;
