import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth/authContext';
import AuthInput from './AuthInput';
import Spinner from '../../ui/Spinner';

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
    authContext.requestPasswordReset(formData);
  };

  const backHandler = () => {
    history.go(0);
  };

  const isContextLoading = authContext.isLoading;
  const isContextError = !authContext.isLoading && !!authContext.error;
  const isContextReset =
    !authContext.isLoading && !!authContext.isPasswordResetRequested;
  const isContextEmptyForm =
    !authContext.isLoading &&
    !authContext.error &&
    !authContext.isPasswordResetRequested;

  const renderLoading = <Spinner height='300px' />;
  const renderError = (
    <div className='form-error'>
      <p>Application error: {authContext.error && authContext.error.message}</p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderedReset = (
    <div className='form-success'>
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
      <div className='form-actions'>
        <button
          disabled={!isFormValid}
          className={isFormValid ? '' : 'form-invalid'}>
          Send me the link
        </button>
      </div>
    </form>
  );

  return (
    <div className='form-container'>
      {isContextLoading && renderLoading}
      {isContextError && renderError}
      {isContextReset && renderedReset}
      {isContextEmptyForm && renderEmptyForm}
    </div>
  );
};

export default ResetPasswordRequest;
