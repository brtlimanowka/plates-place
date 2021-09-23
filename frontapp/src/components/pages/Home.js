import React, { useContext } from 'react';
import AuthContext from '../../store/auth/AuthContext';
import Authentication from '../pages/auth/Authentication';

const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>{authContext.isAuthenticated ? <p>Hi</p> : <Authentication />}</div>
  );
};

export default Home;
