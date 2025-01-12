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

const Vacunacion = () => {
  const rows = [
    { id: 1, vacuna: "Cancino", dosis: "Anual", fecha: "12/11/24", lote: "A123" },
    { id: 2, vacuna: "Td", dosis: "Segunda", fecha: "13/03/22", lote: "B456" },
    { id: 3, vacuna: "Influenza", dosis: "Unica", fecha: "23/11/21", lote: "C789" },
    { id: 4, vacuna: "Hepatitis B", dosis: "Primera", fecha: "25/01/21", lote: "D012" },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vacuna</TableCell>
            <TableCell>Dosis</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Lote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.vacuna}</TableCell>
              <TableCell>{row.dosis}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.lote}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Vacunacion;
