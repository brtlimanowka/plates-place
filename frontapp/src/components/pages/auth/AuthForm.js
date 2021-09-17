import React, { useState, useEffect } from 'react';
import AuthInput from './AuthInput';
import Spinner from '../../ui/elements/Spinner';
import classes from '../css/Authentication.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (Object.values(formData).every((value) => value !== null)) {
      setIsFormValid(true);
    }
  }, [formData]);

  const switchModeHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const nameConfirmed = (name) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, name };
    });
  };
  const emailConfirmed = (email) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, email };
    });
  };
  const passwordConfirmed = (password) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, password };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(isLogin ? '/api/auth/' : '/api/userss/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className={classes['form-container']}>
      {isLoading ? (
        <Spinner height='300px' />
      ) : (
        <form onSubmit={submitHandler}>
          <h2 className={classes.header}>{isLogin ? 'Login' : 'Sign up'}</h2>
          {!isLogin && (
            <AuthInput
              inputType='text'
              inputFor='name'
              inputLabel='Name'
              confirmValue={nameConfirmed}
            />
          )}
          <AuthInput
            inputType='email'
            inputFor='email'
            inputLabel='Email'
            confirmValue={emailConfirmed}
          />
          <AuthInput
            inputType='password'
            inputFor='password'
            inputLabel='Password'
            confirmValue={passwordConfirmed}
          />
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
