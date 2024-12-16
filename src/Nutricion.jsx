import React, { useState } from "react";
import './Tabla.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

const Nutricion = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, edad: 25, peso: 68, estado: "Normal", estatura: 1.75 },
    { id: 2, edad: 30, peso: 85, estado: "Sobrepeso", estatura: 1.70 },
    { id: 3, edad: 40, peso: 95, estado: "Obesidad", estatura: 1.68 },
    { id: 4, edad: 18, peso: 55, estado: "Bajo peso", estatura: 1.60 },
  ];

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selected.length === rows.length}
                onChange={() =>
                  setSelected(selected.length === rows.length ? [] : rows.map((row) => row.id))
                }
              />
            </TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Peso (kg)</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Estatura (m)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCell>
                <Checkbox
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                />
              </TableCell>
              <TableCell>{row.edad}</TableCell>
              <TableCell>{row.peso}</TableCell>
              <TableCell>{row.estado}</TableCell>
              <TableCell>{row.estatura}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Nutricion;
