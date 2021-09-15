import React, { useState, useRef } from 'react';
import Spinner from '../ui/elements/Spinner';
import classes from './css/AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    setIsLoading(true);
    fetch(isLogin ? '/api/auth/' : '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not process request');
        }
        response.json();
      })
      .catch((error) => {
        setErrors((prevErrors) => {
          return { ...prevErrors, global: error.message };
        });
        setIsLoading(false);
      });
  };

  const hasNameError = errors && errors.name;
  const hasEmailError = errors && errors.email;
  const hasPasswordError = errors && errors.password;
  const hasGlobalError = errors && errors.global;

  return (
    <div className={classes['form-container']}>
      {isLoading ? (
        <Spinner height='300px' />
      ) : (
        <form onSubmit={submitHandler}>
          {hasGlobalError ? (
            <h2 className={classes['form-error']}>{errors.global}</h2>
          ) : (
            <h2 className={classes.header}>{isLogin ? 'Login' : 'Sign up'}</h2>
          )}

          <div className={classes['form-group']}>
            <div className={classes['form-label']}>
              <label htmlFor='name'>Name</label>
              {hasNameError && <span>{errors.name}</span>}
            </div>
            <input type='text' id='name' ref={nameInputRef} />
          </div>
          <div className={classes['form-group']}>
            <div className={classes['form-label']}>
              <label htmlFor='email'>Email</label>
              {hasEmailError && <span>{errors.email}</span>}
            </div>
            <input type='email' id='email' ref={emailInputRef} />
          </div>
          <div className={classes['form-group']}>
            <div className={classes['form-label']}>
              <label htmlFor='password'>Password</label>
              {hasPasswordError && <span>{errors.password}</span>}
            </div>
            <input type='password' id='password' ref={passwordInputRef} />
          </div>
          <div className={classes['form-actions']}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
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
