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

  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('estudios desde estudios: ', cartilla.estudios);
  const rows = cartilla.estudios;

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
            <TableRow key={row.id ? row.id : '0'}>
              <TableCell>{row.estudio ? row.estudio : '-'}</TableCell>
              <TableCell>{row.fecha ? row.fecha : '-'}</TableCell>
              <TableCell>{row.resultado ? row.resultado : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Estudios;
