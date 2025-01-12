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

const Antecedentes = () => {
  const rows = [
    { 
      id: 1, 
      alergias: "Polen, Polvo, Insulina", 
      discapacidad: "Visual", 
      cancer: "Cáncer de colón", 
      cirugias: "Apendice", 
      diabetes: "Tipo II", 
      transfusiones: "Sanguínea (2024-09-24)", 
      otros: "Hipertensión" 
    },
    { 
      id: 2, 
      alergias: "Pescado, Látex", 
      discapacidad: "Auditiva", 
      cancer: "Melanoma", 
      cirugias: "Rodilla", 
      diabetes: "Tipo I", 
      transfusiones: "Plasma (2023-11-10)", 
      otros: "Asma" 
    },
    { 
      id: 3, 
      alergias: "Cacahuates, Gatos", 
      discapacidad: "Motora", 
      cancer: "Leucemia", 
      cirugias: "Coronaria", 
      diabetes: "Pre-diabetes", 
      transfusiones: "Sanguínea (2024-05-15)", 
      otros: "Epilepsia" 
    },
    { 
      id: 4, 
      alergias: "Huevo, Polvo", 
      discapacidad: "Cognitiva", 
      cancer: "Cáncer de mama", 
      cirugias: "Cadera", 
      diabetes: "Tipo II", 
      transfusiones: "Sanguínea (2022-08-30)", 
      otros: "Obesidad" 
    },
  ];

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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.alergias}</TableCell>
              <TableCell>{row.discapacidad}</TableCell>
              <TableCell>{row.cancer}</TableCell>
              <TableCell>{row.cirugias}</TableCell>
              <TableCell>{row.diabetes}</TableCell>
              <TableCell>{row.transfusiones}</TableCell>
              <TableCell>{row.otros}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Antecedentes;
