import React from 'react';
import CenteredCard from '../../styles/CenteredCard.styled';
import Authentication from '../../styles/Authentication.styled';
import AuthForm from './AuthForm';

const Auth = () => {
  return (
    <CenteredCard>
      <Authentication>
        <header>
          <h1>Welcome to Plates' Place</h1>
          <h3>An online home gym PPL program planner</h3>
        </header>
        <AuthForm />
      </Authentication>
    </CenteredCard>
  );
};

export default Auth;
