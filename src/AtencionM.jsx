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

  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('citas desde atencion: ', cartilla.cita);
  const rows = cartilla.cita;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
            <TableRow key={row.id ? row.id : 0}>
              <TableCell>{row.horario ? formatDate(row.horario) : '-'}</TableCell>
              <TableCell>{row.servicio ? row.servicio: '-'}</TableCell>
              <TableCell>{row.clave ? row.clave : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AtencionM;
