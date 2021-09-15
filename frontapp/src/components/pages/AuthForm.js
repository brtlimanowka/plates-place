import React, { useState, useRef, useEffect } from 'react';
import Spinner from '../ui/elements/Spinner';
import classes from './css/AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    global: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    setIsFormValid(Object.values(errors).every((value) => value === null));
  }, [errors]);

  const switchModeHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };
  const nameFocusHandler = () => {
    setErrors((prevErrors) => {
      return { ...prevErrors, name: null };
    });
  };
  const emailFocusHandler = () => {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: null };
    });
  };
  const passwordFocusHandler = () => {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: null };
    });
  };
  const nameBlurHandler = (event) => {
    if (!event.target.value.trim()) {
      setErrors((prevErrors) => {
        return { ...prevErrors, name: 'Name is required' };
      });
    }
  };
  const emailBlurHandler = (event) => {
    if (!event.target.value.trim() || !event.target.value.includes('@')) {
      setErrors((prevErrors) => {
        return { ...prevErrors, email: 'Please enter a valid email' };
      });
    } else {
      let encodedEmail = btoa(event.target.value);
      fetch(`/api/users/:${encodedEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message !== 'OK') {
            setErrors((prevErrors) => {
              return { ...prevErrors, email: 'Email already in use' };
            });
            return;
          }
        });
    }
  };
  const passwordBlurHandler = (event) => {
    if (event.target.value.trim() < 1) {
      setErrors((prevErrors) => {
        return { ...prevErrors, password: 'Password is required' };
      });
      return;
    }
    if (event.target.value.trim() < 6) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: 'Password must be at least 6 characters long',
        };
      });
    }
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
      .then((response) => response.json())
      .then((data) => {
        if (data.errors && data.errors.length) {
          throw new Error('Required data is missing from the form');
        }
        setIsLoading(false);
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
            <input
              type='text'
              id='name'
              ref={nameInputRef}
              onFocus={nameFocusHandler}
              onBlur={nameBlurHandler}
            />
          </div>
          <div className={classes['form-group']}>
            <div className={classes['form-label']}>
              <label htmlFor='email'>Email</label>
              {hasEmailError && <span>{errors.email}</span>}
            </div>
            <input
              type='email'
              id='email'
              ref={emailInputRef}
              onFocus={emailFocusHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          <div className={classes['form-group']}>
            <div className={classes['form-label']}>
              <label htmlFor='password'>Password</label>
              {hasPasswordError && <span>{errors.password}</span>}
            </div>
            <input
              type='password'
              id='password'
              ref={passwordInputRef}
              onFocus={passwordFocusHandler}
              onBlur={passwordBlurHandler}
            />
          </div>
          <div className={classes['form-actions']}>
            <button style={isFormValid ? { color: 'green' } : { color: 'red' }}>
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
