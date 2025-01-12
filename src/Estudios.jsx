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

const Estudios = () => {
  const rows = [
    { id: 1, estudio: "Hemograma", fecha: "2023-01-15", resultado: "Normal" },
    { id: 2, estudio: "Radiografía de tórax", fecha: "2023-02-20", resultado: "Anormal" },
    { id: 3, estudio: "Prueba de glucosa", fecha: "2023-03-12", resultado: "Normal" },
    { id: 4, estudio: "Electrocardiograma", fecha: "2023-04-10", resultado: "Normal" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Estudio</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Resultado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.estudio}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.resultado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Estudios;
