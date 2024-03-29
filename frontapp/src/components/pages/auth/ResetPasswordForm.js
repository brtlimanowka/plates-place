import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth/authContext';
import AuthInput from './AuthInput';
import Spinner from '../../ui/Spinner';

const ResetPasswordForm = ({ manageString }) => {
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const [manageStringVerified, setManageStringVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    manageString: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/auth/verify/${manageString}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (data.found) {
          setFormData((prevFormData) => {
            return { ...prevFormData, manageString };
          });
          setManageStringVerified({ confirmed: true });
        } else {
          setManageStringVerified({ confirmed: false });
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [manageString]);

  useEffect(() => {
    setIsFormValid(!!formData.password && !!formData.manageString);
  }, [formData]);

  const passwordConfirmed = (password) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, password };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.startLoading();
    authContext.resetPassword(formData);
  };

  const backHandler = () => {
    history.push('/login');
  };

  const isContextLoading = isLoading || authContext.isLoading;
  const isContextError =
    !isLoading &&
    !authContext.isLoading &&
    (!!authContext.error ||
      (manageStringVerified && !manageStringVerified.confirmed));
  const isContextReset =
    !isLoading &&
    !authContext.isLoading &&
    authContext.isPasswordResetSuccessful;
  const isContextEmptyForm =
    !isLoading &&
    !authContext.isLoading &&
    !authContext.error &&
    (!manageStringVerified || manageStringVerified.confirmed) &&
    !authContext.isPasswordResetSuccessful;

  const renderLoading = <Spinner height='300px' />;
  const renderError = (
    <div className='form-error'>
      <p>
        Application error:{' '}
        {(authContext.error && authContext.error.message) ||
          (manageStringVerified &&
            !manageStringVerified.confirmed &&
            'Invalid link')}
      </p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderedReset = (
    <div className='form-success'>
      <p>Success!</p>
      <p>
        Your password has been reset. Click the button below and log in using
        your new password
      </p>
      <button type='button' onClick={backHandler}>
        Back
      </button>
    </div>
  );
  const renderEmptyForm = (
    <form onSubmit={submitHandler}>
      <h3>Set your new password</h3>
      <AuthInput
        isLogin={true}
        inputType='password'
        inputFor='password'
        inputLabel='Password'
        confirmValue={passwordConfirmed}
      />
      <div className='form-actions'>
        <button
          disabled={!isFormValid}
          className={isFormValid ? '' : 'form-invalid'}>
          Update password
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

export default ResetPasswordForm;
