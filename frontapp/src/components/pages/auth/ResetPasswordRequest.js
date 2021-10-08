import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth/authContext';
import AuthInput from './AuthInput';
import Spinner from '../../ui/elements/Spinner';
import classes from '../css/Authentication.module.css';

const ResetPasswordRequest = () => {
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(!!formData.email);
  }, [formData]);

  const emailConfirmed = (email) => {
    setFormData({ email });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.startLoading();
    authContext.resetPassword(formData);
  };

  const backHandler = () => {
    history.go(0);
  };

  const isContextLoading = authContext.isLoading;
  const isContextError = !authContext.isLoading && !!authContext.error;
  const isContextReset =
    !authContext.isLoading && !!authContext.isPasswordReset;
  const isContextEmptyForm =
    !authContext.isLoading &&
    !authContext.error &&
    !authContext.isPasswordReset;

  const renderLoading = <Spinner height='300px' />;
  const renderError = (
    <div className={classes['form-error']}>
      <p>Application error: {authContext.error && authContext.error.message}</p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderedReset = (
    <div className={classes['form-success']}>
      <p>Success!</p>
      <p>
        We've sent you an email with a link that'll allow you to reset your
        password.
      </p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderEmptyForm = (
    <form onSubmit={submitHandler}>
      <h3>
        We'll send you an email with a link where you'll be able to reset your
        password
      </h3>
      <AuthInput
        isLogin={true}
        inputType='email'
        inputFor='email'
        inputLabel='Email'
        confirmValue={emailConfirmed}
      />
      <div className={classes['form-actions']}>
        <button
          disabled={!isFormValid}
          className={isFormValid ? '' : classes['form-invalid']}>
          Send me the link
        </button>
      </div>
    </form>
  );

  return (
    <div className={classes['form-container']}>
      {isContextLoading && renderLoading}
      {isContextError && renderError}
      {isContextReset && renderedReset}
      {isContextEmptyForm && renderEmptyForm}
    </div>
  );
};

export default ResetPasswordRequest;
