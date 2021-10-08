import React from 'react';
import { useParams } from 'react-router';
import CenteredCard from '../../ui/templates/CenteredCard';
import ResetPasswordRequest from './ResetPasswordRequest';
import ResetPasswordForm from './ResetPasswordForm';
import classes from '../css/Authentication.module.css';

const ResetPassword = () => {
  const { manageString } = useParams();

  return (
    <CenteredCard>
      <main className={classes.card}>
        <header>
          <h1>Reset My Password</h1>
        </header>
        {manageString ? <ResetPasswordForm /> : <ResetPasswordRequest />}
      </main>
    </CenteredCard>
  );
};

export default ResetPassword;
