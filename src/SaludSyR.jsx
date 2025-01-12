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

const SaludSyR = () => {
  const rows = [
    { id: 1, accion: "Otorgamiento de preservativo masculino", fecha: "2023-01-01", tipo: "Otorgamiento método anticonceptivo", observaciones: "Paciente recibió método anticonceptivo" },
    { id: 2, accion: "Consulta médica", fecha: "2023-02-05", tipo: "Consulta general", observaciones: "Paciente con síntomas de resfriado" },
    { id: 3, accion: "Vacunación", fecha: "2023-03-10", tipo: "Vacuna contra la gripe", observaciones: "Paciente vacunado con éxito" },
    { id: 4, accion: "Chequeo de salud", fecha: "2023-04-15", tipo: "Chequeo general", observaciones: "Exámenes en proceso" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Acción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Observaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.accion}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>{row.observaciones}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SaludSyR;
