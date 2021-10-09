import React, { useContext } from 'react';
import AuthContext from '../../store/auth/authContext';
import Auth from '../pages/auth/Auth';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return <div>{isAuthenticated ? <div></div> : <Auth />}</div>;
};

export default Home;
