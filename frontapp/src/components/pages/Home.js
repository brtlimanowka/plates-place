import React, { useContext } from 'react';
import AuthContext from '../../store/auth/authContext';
import Authentication from '../pages/auth/Authentication';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <div>{isAuthenticated ? <p>Hi</p> : <Authentication />}</div>;
};

export default Home;
