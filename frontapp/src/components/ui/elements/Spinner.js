import React from 'react';
import CenteredCard from '../templates/CenteredCard';
import classes from './css/Spinner.module.css';

const Spinner = () => {
  return (
    <CenteredCard height={'100vh'}>
      <div id={classes.spinner_dot1} className={classes.spinner_dot}></div>
      <div id={classes.spinner_dot2} className={classes.spinner_dot}></div>
      <div id={classes.spinner_dot3} className={classes.spinner_dot}></div>
    </CenteredCard>
  );
};

export default Spinner;
