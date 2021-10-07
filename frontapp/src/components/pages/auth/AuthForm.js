import React, { useState, useEffect, useContext } from 'react';
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
  const resetPasswordHandler = () => {
    history.push('/reset');
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

  const isContextLoading = authContext.isLoading;
  const isContextError = !authContext.isLoading && !!authContext.error;
  const isContextRegistered =
    !authContext.isLoading && !!authContext.isRegistered;
  const isContextEmptyForm =
    !authContext.isLoading && !authContext.error && !authContext.isRegistered;

  const renderLoading = <Spinner height='300px' />;
  const renderError = (
    <div className={classes['form-error']}>
      <p>Application error: {authContext.error && authContext.error.message}</p>
      {authContext.error && authContext.error.message === 'Forbidden' && (
        <p className={classes['form-error_forbidden']}>
          Your account may be inactive.
          <br />
          Check your inbox for activation email.
        </p>
      )}
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderedRegistered = (
    <div className={classes['form-success']}>
      <p>Success!</p>
      <p>Your account has been registered.</p>
      <p>Check your email to activate it!</p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderEmptyForm = (
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
        {isLogin && (
          <button type='button' onClick={resetPasswordHandler}>
            Forgot my password
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className={classes['form-container']}>
      {isContextLoading && renderLoading}
      {isContextError && renderError}
      {isContextRegistered && renderedRegistered}
      {isContextEmptyForm && renderEmptyForm}
    </div>
  );
};

export default AuthForm;
