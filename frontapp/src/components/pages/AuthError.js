import React from 'react';
import classes from './css/AuthError.module.css';

const AuthError = (props) => {
  return <p className={classes['form-error']}>{props.errorMessage}</p>;
};

export default AuthError;
