import React, { useState, useEffect } from 'react';
import classes from '../css/Authentication.module.css';

const AuthInput = (props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [inputHasError, setInputHasError] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [emailFound, setEmailFound] = useState(undefined);

  useEffect(() => {
    setIsTouched(false);
    setInputHasError(false);
    setInputError(null);
    setInputValue('');
    setEmailFound(undefined);
    // eslint-disable-next-line
  }, [props.isLogin]);

  useEffect(() => {
    if (isTouched && props.isLogin) {
      if (!emailFound) {
        setInputHasError(true);
        setInputError('Email not found');
      } else {
        setInputHasError(false);
        setInputError(null);
      }
    } else {
      if (emailFound) {
        setInputHasError(true);
        setInputError('Email already in use');
      } else {
        setInputHasError(false);
        setInputError(null);
      }
    }
    // eslint-disable-next-line
  }, [emailFound]);

  useEffect(() => {
    const correctEmailFound = props.isLogin ? emailFound : !emailFound;
    let inputValid = false;
    if (props.inputFor === 'email') {
      inputValid = isTouched && !inputHasError && correctEmailFound;
    } else {
      inputValid = isTouched && !inputHasError;
    }
    if (inputValid) {
      props.confirmValue(inputValue);
    } else {
      props.confirmValue(null);
    }
    // eslint-disable-next-line
  }, [inputHasError, inputValue, emailFound]);

  const checkEmailAvailability = (email) => {
    let encodedEmail = btoa(email);
    setTimeout(() => {
      fetch(`/api/users/${encodedEmail}`, {
        cache: 'no-store',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.found) {
            setEmailFound(true);
          } else {
            setEmailFound(false);
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
        setInputError(null);
        if (!!value.trim().length && value.trim().includes('@')) {
          if (emailFound === undefined) {
            setInputHasError(true);
          }
          checkEmailAvailability(value);
        } else {
          setInputHasError(true);
          setInputError('Valid email required');
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
    clearTimeout(checkEmailAvailability);
  };
  const inputChangeHandler = (event) => {
    setIsTouched(true);
    setInputValue(event.target.value);
    validateInput(event.target.value);
  };
  const inputBlurHandler = (event) => {
    validateInput(event.target.value);
  };

  return (
    <div className={classes['form-group']}>
      <div className={classes['form-label']}>
        <label htmlFor={props.inputFor}>{props.inputLabel}</label>
        {inputHasError && inputError && <span>{inputError}</span>}
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
