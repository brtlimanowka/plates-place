import React, { useState, useEffect, Fragment } from 'react';
import AuthInput from './AuthInput';
import Spinner from '../../ui/elements/Spinner';
import classes from '../css/Authentication.module.css';

const AuthForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [applicationError, setApplicationError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLogin, isLoading]);
  useEffect(() => {
    if (isLogin) {
      setIsFormValid(formData.email && formData.password);
    } else {
      setIsFormValid(formData.name && formData.email && formData.password);
    }
  }, [isLogin, formData]);

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
    fetch(isLogin ? '/api/auth/' : '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        localStorage.setItem('token', data.token);
        console.log(data);
      })
      .catch((error) => {
        setApplicationError(error.message);
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Fragment>
      {isLoggedIn && <p>Logged in</p>}
      {!isLoggedIn && (
        <div className={classes['form-container']}>
          {isLoading && !applicationError && <Spinner height='300px' />}
          {!isLoading && !!applicationError && (
            <p className={classes['form-error']}>
              Application error: {applicationError}
            </p>
          )}
          {!isLoading && !applicationError && (
            <form onSubmit={submitHandler}>
              <h2 className={classes.header}>
                {isLogin ? 'Login' : 'Sign up'}
              </h2>
              {!isLogin && (
                <AuthInput
                  isLogin={isLogin}
                  inputType='text'
                  inputFor='name'
                  inputLabel='Name'
                  confirmValue={nameConfirmed}
                />
              )}
              <AuthInput
                isLogin={isLogin}
                inputType='email'
                inputFor='email'
                inputLabel='Email'
                confirmValue={emailConfirmed}
              />
              <AuthInput
                isLogin={isLogin}
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
                  {isLogin
                    ? 'Create new account'
                    : 'Login with existing account'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default AuthForm;
