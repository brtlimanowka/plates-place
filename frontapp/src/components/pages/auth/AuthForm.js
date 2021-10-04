import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth/authContext';
import AuthInput from './AuthInput';
import Spinner from '../../ui/elements/Spinner';
import classes from '../css/Authentication.module.css';

const AuthForm = () => {
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

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
  const backHandler = () => {
    history.go(0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.startLoading();
    if (isLogin) {
      authContext.logIn(formData);
    } else {
      authContext.registerUser(formData);
    }
  };

  return (
    <Fragment>
      <div className={classes['form-container']}>
        {authContext.isLoading && !authContext.error && (
          <Spinner height='300px' />
        )}
        {!authContext.isLoading && !!authContext.error && (
          <div className={classes['form-error']}>
            <p>Application error: {authContext.error.message}</p>
            <button type='button' onClick={backHandler}>
              Back
            </button>
          </div>
        )}
        {!authContext.isLoading && !authContext.error && (
          <form onSubmit={submitHandler}>
            <h2 className={classes.header}>{isLogin ? 'Login' : 'Sign up'}</h2>
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
                {isLogin ? 'Create new account' : 'Login with existing account'}
              </button>
            </div>
          </form>
        )}
      </div>
    </Fragment>
  );
};

export default AuthForm;
