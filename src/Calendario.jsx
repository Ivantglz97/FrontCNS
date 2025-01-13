import React, { useState, useEffect } from "react";
import './Calendario.css'

const Calendario = ({citas}) => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [appointments, setAppointments] = useState(
    citas.map(cita => ({
      ...cita,
      date: cita.horario.split('T')[0]
    }))
  );
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('appointments desde calendario: ', appointments);

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    setStartDay(firstDay);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    setDaysInMonth(daysInMonth);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderDays = () => {
    let daysArray = [];
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    for (let i = 0; i < startDay; i++) {
      daysArray.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonth, i);
      const dayString = dayDate.toISOString().split("T")[0];

      const isToday = dayString === new Date().toISOString().split("T")[0];
      const hasCita = appointments.some(appointment => appointment.date === dayString);

      let dayClass = "day";
      if (isToday) dayClass += " today";
      if (hasCita) dayClass += " with-cita";

      daysArray.push(
        <td
          key={i}
          className={dayClass}
          onClick={() => handleDayClick(dayString)} // Mostrar el modal al hacer clic
        >
          {i}
          {hasCita && (
            <div className="cita-indicator">
              <span>📅</span>
            </div>
          )}
        </td>
      );
    }

    return daysArray;
  };

  const renderWeeks = () => {
    const days = renderDays();
    const weeks = [];
    let week = [];
    days.forEach((day, index) => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(<tr key={`week-${index}`}>{week}</tr>);
        week = [];
      }
    });
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(<td key={`empty-${week.length}`} className="empty"></td>);
      }
      weeks.push(<tr key={`week-last`}>{week}</tr>);
    }

    return weeks;
  };

  // Manejar clic en un día
  const handleDayClick = (dayString) => {
    const appointment = appointments.find(a => a.date === dayString);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsModalOpen(true); // Abrir el modal
    }
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Cerrar el modal si se hace clic fuera de él
  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>Anterior</button>
        <span>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</span>
        <button onClick={() => changeMonth(1)}>Siguiente</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Dom</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mié</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sáb</th>
          </tr>
        </thead>
        <tbody>{renderWeeks()}</tbody>
      </table>

      {/* Indicador de los colores */}
      <div className="calendar-indicator">
        <div className="indicator-item">
          <div className="indicator-box today"></div>
          <span>Con Cita</span>
        </div>
        <div className="indicator-item">
          <div className="indicator-box with-cita"></div>
          <span>Hoy</span>
        </div>
      </div>

      {/* Modal con la cita */}
      {isModalOpen && selectedAppointment && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>X</span>
            <h2>Cita del {selectedAppointment.date}</h2>
            <p><strong>Detalles:</strong> {selectedAppointment.servicio}</p>
            <h3>{selectedAppointment.horario.split('T')[1].split(':').slice(0, 2).join(':')} hrs</h3>          
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
