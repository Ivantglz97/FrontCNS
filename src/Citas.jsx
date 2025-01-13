import React from 'react';
import './Usuario.css'; 
import Calendario from './Calendario'

const Citas = () => {

  const cartilla = JSON.parse(localStorage.getItem('cartilla'));
  const citas = cartilla.cita;

  console.log('citas: ', citas);

  return (
    <div>
          <Calendario citas={citas}/>
    </div>
  );
};

export default Citas;
