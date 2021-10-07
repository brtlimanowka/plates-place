import React from 'react';
import CenteredCard from '../../ui/templates/CenteredCard';
import AuthInput from './AuthInput';
import classes from '../css/Authentication.module.css';

const ResetPassword = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  const emailConfirmed = () => {};

  return (
    <CenteredCard>
      <main className={classes.card}>
        <header>
          <h1>Reset My Password</h1>
        </header>
        <div className={classes['form-container']}>
          <form onSubmit={submitHandler}>
            <h3>
              We'll send you an email with a link where
              <br /> you'll be able to reset your password
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
                disabled={null}
                className={false ? '' : classes['form-invalid']}>
                Send me the link
              </button>
            </div>
          </form>
        </div>
      </main>
    </CenteredCard>
  );
};

export default ResetPassword;
