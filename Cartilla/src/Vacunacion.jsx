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

const Vacunacion = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, dosis: "Anual", enfermedades: "COVID 19", lote: "A123", vacuna: "Cancino", aplicacion: "12/11/24" },
    { id: 2, dosis: "Segunda", enfermedades: "Tetanos y Difteria", lote: "B456", vacuna: "Td", aplicacion: "13/03/22" },
    { id: 3, dosis: "Unica", enfermedades: "Influenza", lote: "C789", vacuna: "Influeza", aplicacion: "23/11/21" },
    { id: 4, dosis: "Primera", enfermedades: "Hepatitis B", lote: "D012", vacuna: "Hepatitis B", aplicacion: "25/01/21" },
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
            <TableCell>Dosis</TableCell>
            <TableCell>Enfermedades que previene</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell>Vacuna</TableCell>
            <TableCell>Fecha de Aplicación</TableCell>
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
              <TableCell>{row.dosis}</TableCell>
              <TableCell>{row.enfermedades}</TableCell>
              <TableCell>{row.lote}</TableCell>
              <TableCell>{row.vacuna}</TableCell>
              <TableCell>{row.aplicacion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Vacunacion;