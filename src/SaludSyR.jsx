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

  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('salud desde salud: ', cartilla.saludSexuals);
  const rows = cartilla.saludSexuals;

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
            <TableRow key={row.id ? row.id : '0'}>
              <TableCell>{row.accion ? row.accion : '-'}</TableCell>
              <TableCell>{row.fecha ? row.fecha : '-'}</TableCell>
              <TableCell>{row.tipo ? row.tipo : '-'}</TableCell>
              <TableCell>{row.observaciones ? row.observaciones : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SaludSyR;
