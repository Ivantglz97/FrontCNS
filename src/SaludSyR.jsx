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

const SaludSyR = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const rows = [
    { id: 1, accion: "Registrar asistencia", fecha: "2024-12-05", lugar: "Clínica Central" },
    { id: 2, accion: "Ver detalles", fecha: "2024-12-10", lugar: "Unidad de Salud Norte" },
    { id: 3, accion: "Cancelar cita", fecha: "2024-12-12", lugar: "Clínica Familiar Sur" },
    { id: 4, accion: "Registrar asistencia", fecha: "2024-12-15", lugar: "Centro de Vacunación Este" },
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
            <TableCell>Acción</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Lugar</TableCell>
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
              <TableCell>{row.accion}</TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell>{row.lugar}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SaludSyR;
