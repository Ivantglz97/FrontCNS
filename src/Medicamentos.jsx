import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import './Tabla.css'; // Importa el archivo CSS

const Medicamentos = () => {
  const rows = [
    { id: 1, cantidad: 2, nombre: "Paracetamol", presentacion: "500mg", fecha: "12/11/24" },
    { id: 2, cantidad: 1, nombre: "Omeprazol", presentacion: "300mg", fecha: "13/03/22" },
    { id: 3, cantidad: 1, nombre: "Ciprofloxacino", presentacion: "500mg", fecha: "23/11/21" },
    { id: 4, cantidad: 5, nombre: "Paracetamol", presentacion: "500mg", fecha: "25/01/21" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell>Nombre del Medicamento</TableCell>
            <TableCell>Presentación</TableCell>
            <TableCell>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cantidad}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.presentacion}</TableCell>
              <TableCell>{row.fecha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Medicamentos;
