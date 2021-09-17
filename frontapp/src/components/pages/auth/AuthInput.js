import React, { useState, useEffect } from 'react';
import classes from '../css/Authentication.module.css';

const AuthInput = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [inputHasError, setInputHasError] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isTouched && !inputHasError) {
      props.confirmValue(inputValue);
    } else {
      props.confirmValue(null);
    }
    // eslint-disable-next-line
  }, [isTouched, inputHasError, inputValue]);

  const checkEmailAvailability = (email) => {
    let encodedEmail = btoa(email);
    setTimeout(() => {
      fetch(`/api/users/${encodedEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'OK') {
            setInputHasError(false);
            setInputError(null);
          } else {
            setInputHasError(true);
            setInputError('Email already in use');
          }
        });
    }, 500);
  };

  const validateInput = (value) => {
    switch (props.inputFor) {
      case 'name':
        if (!!value.trim().length) {
          setInputHasError(false);
          setInputError(null);
        } else {
          setInputHasError(true);
          setInputError('Required');
        }
        return;
      case 'email':
        if (!!value.trim().length && value.trim().includes('@')) {
          setInputHasError(false);
          setInputError(null);
        } else {
          setInputHasError(true);
          setInputError('Required');
        }
        return;
      case 'password':
        if (value.trim().length >= 6) {
          setInputHasError(false);
          setInputError(null);
        } else {
          setInputHasError(true);
          setInputError('At least 6 characters long');
        }
        return;
      default:
        break;
    }
  };

  const inputFocusHandler = () => {
    // clearTimeout(checkEmailAvailability);
  };
  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setInputValue(event.target.value);
    validateInput(event.target.value);
    if (
      props.inputFor === 'email' &&
      !inputHasError &&
      event.target.value !== ''
    ) {
      checkEmailAvailability(event.target.value);
    }
  };
  const inputBlurHandler = (event) => {
    validateInput(event.target.value);
    if (
      props.inputFor === 'email' &&
      !inputHasError &&
      event.target.value !== ''
    ) {
      checkEmailAvailability(event.target.value);
    }
  };

  return (
    <div className={classes['form-group']}>
      <div className={classes['form-label']}>
        <label htmlFor={props.inputFor}>{props.inputLabel}</label>
        {inputHasError && <span>{inputError}</span>}
      </div>
      <input
        type={props.inputType}
        id={props.inputFor}
        value={inputValue}
        onFocus={inputFocusHandler}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
    </div>
  );
};

export default AuthInput;
