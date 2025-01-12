import React from "react";
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

const Nutricion = () => {
  const rows = [
    { id: 1, fecha: "2024-12-01", peso: 68, estatura: 1.75 },
    { id: 2, fecha: "2024-12-05", peso: 85, estatura: 1.70 },
    { id: 3, fecha: "2024-12-10", peso: 95, estatura: 1.68 },
    { id: 4, fecha: "2024-12-15", peso: 55, estatura: 1.60 },
  ];

  // Función para calcular el IMC
  const calcularIMC = (peso, estatura) => {
    return (peso / (estatura * estatura)).toFixed(2);
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Peso (kg)</TableCell>
            <TableCell>Estatura (m)</TableCell>
            <TableCell>IMC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.peso}</TableCell>
              <TableCell>{row.estatura}</TableCell>
              <TableCell>{calcularIMC(row.peso, row.estatura)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Nutricion;
