import React, { useContext } from 'react';
import AuthContext from '../../store/auth/authContext';
import Authentication from '../pages/auth/Authentication';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <div>{isAuthenticated ? <div></div> : <Authentication />}</div>;
};

export default Home;
