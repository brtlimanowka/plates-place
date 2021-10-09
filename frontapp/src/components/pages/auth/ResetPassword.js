import React from 'react';
import { useParams } from 'react-router';
import CenteredCard from '../../styles/CenteredCard.styled';
import Authentication from '../../styles/Authentication.styled';
import ResetPasswordRequest from './ResetPasswordRequest';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  const { manageString } = useParams();

  return (
    <CenteredCard>
      <Authentication>
        <header>
          <h1>Reset My Password</h1>
        </header>
        {manageString ? (
          <ResetPasswordForm manageString={manageString} />
        ) : (
          <ResetPasswordRequest />
        )}
      </Authentication>
    </CenteredCard>
  );
};

export default ResetPassword;
