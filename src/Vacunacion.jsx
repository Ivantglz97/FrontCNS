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

  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('vacunacion desde vacunacion: ', cartilla.vacunas);
  const rows = cartilla.vacunas;

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
            <TableRow key={row.id ? row.id : 0}>
              <TableCell>{row.vacuna ? row.vacuna : '-'}</TableCell>
              <TableCell>{row.dosis ? row.dosis : '-'}</TableCell>
              <TableCell>{row.fecha ? row.fecha : '-'}</TableCell>
              <TableCell>{row.lote ? row.lote : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Vacunacion;
