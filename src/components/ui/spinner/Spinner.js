import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className='spinner_container'>
      <div id='spinner_dot1' className='spinner_dot'></div>
      <div id='spinner_dot2' className='spinner_dot'></div>
      <div id='spinner_dot3' className='spinner_dot'></div>
    </div>
  );
};

export default Spinner;
