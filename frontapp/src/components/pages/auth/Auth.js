import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../../store/auth/authContext';
import CenteredCard from '../../styles/CenteredCard.styled';
import Authentication from '../../styles/Authentication.styled';
import AuthForm from './AuthForm';

const Auth = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    isAuthenticated && history.push('/');
    // eslint-disable-next-line
  }, [isAuthenticated]);

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
