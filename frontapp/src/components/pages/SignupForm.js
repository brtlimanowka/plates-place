import React, { useState } from 'react';
import classes from './css/SignupForm.module.css';

const SignupForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes['form-container']}>
      <form onSubmit={submitHandler}>
        <h2>{isLogin ? 'Login' : 'Sign up'}</h2>
        <div className={classes['form-control']}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' />
        </div>
        <div className={classes['form-control']}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
        <div className={classes['form-actions']}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type='button' onClick={switchModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
