import React, { useState } from "react";
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

const Medicamentos = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, cantidad: 2, nombre: "Paracetamol", presentacion: "500mg", fecha: "12/11/24" },
    { id: 2, cantidad: 1, nombre: "Omeprazol", presentacion: "300mg", fecha: "13/03/22" },
    { id: 3, cantidad: 1, nombre: "Ciprofloxacino", presentacion: "500mg", fecha: "23/11/21" },
    { id: 4, cantidad: 5, nombre: "Paracetamol", presentacion: "500mg", fecha: "25/01/21" },
  ];

  return (
    <TableContainer component={Paper}>
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
            <TableCell>Cantidad</TableCell>
            <TableCell>Nombre del Medicamento</TableCell>
            <TableCell>Presentación</TableCell>
            <TableCell>Fecha</TableCell>
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
