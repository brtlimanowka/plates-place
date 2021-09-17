import React, { useState } from 'react';
import Spinner from '../../ui/elements/Spinner';
import classes from '../css/Authentication.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const switchModeHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className={classes['form-container']}>
      {isLoading ? (
        <Spinner height='300px' />
      ) : (
        <form onSubmit={submitHandler}>
          <h2 className={classes.header}>{isLogin ? 'Login' : 'Sign up'}</h2>
          <div className={classes['form-actions']}>
            <button
              disabled={!isFormValid}
              className={isFormValid ? '' : classes['form-invalid']}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
            <button type='button' onClick={switchModeHandler}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
