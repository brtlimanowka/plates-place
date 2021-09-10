import React from 'react';
import classes from './css/CenteredCard.module.css';

const CenteredCard = ({ height, children }) => {
  const divHeight = { height: height };
  return (
    <div className={classes.centered} style={divHeight}>
      {children}
    </div>
  );
};

export default CenteredCard;
