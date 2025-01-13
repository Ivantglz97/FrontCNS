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
// import clienteAxios from "./config/axios";

const Antecedentes = () => {
  
  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  console.log('antecedentes desde antecedentes: ', cartilla.antecedente);
  const antecedente = cartilla.antecedente;
  // const rows = cartilla.antecedentes;

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Alergias</TableCell>
            <TableCell>Discapacidad</TableCell>
            <TableCell>Cáncer</TableCell>
            <TableCell>Cirugías</TableCell>
            <TableCell>Diabetes</TableCell>
            <TableCell>Transfusiones</TableCell>
            <TableCell>Otros</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={antecedente.id}>
              <TableCell>{(antecedente.alergias ? antecedente.alergias : '-')}</TableCell>
              <TableCell>{antecedente.discapacidad ? antecedente.discapacidad : '-'}</TableCell>
              <TableCell>{antecedente.cancer ? antecedente.cancer : '-'}</TableCell>
              <TableCell>{antecedente.cirugias ? antecedente.cirugias : '-'}</TableCell>
              <TableCell>{antecedente.diabetes ? antecedente.diabetes : '-'}</TableCell>
              <TableCell>{antecedente.transfusiones ? antecedente.transfusiones : '-'}</TableCell>
              <TableCell>{antecedente.otros ? antecedente.otros : '-'}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Antecedentes;
