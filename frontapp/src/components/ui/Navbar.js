import React, { useContext } from 'react';
import AuthContext from '../../store/auth/authContext';
import { Link } from 'react-router-dom';
import Navigation from '../styles/Navigation.styled';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.logOut();
  };

  return (
    <Navigation>
      <header>
        <Link to='/'>
          <i className='icon fas fa-dumbbell'></i>
          <span className='appname'>Plates' Place</span>
        </Link>
      </header>
      {authContext.isAuthenticated && (
        <ul className='menu'>
          <li className='menu-item'>
            <Link to='/'>
              <i className='icon far fa-calendar-check'></i>
              <span className='menu-item_label'>Plan My Week</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/workouts'>
              <i className='icon fas fa-wrench'></i>
              <span className='menu-item_label'>Workouts</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/stopwatch'>
              <i className='icon fas fa-stopwatch'></i>
              <span className='menu-item_label'>Stopwatch</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/settings'>
              <i className='icon fas fa-sliders-h'></i>
              <span className='menu-item_label'>Settings</span>
            </Link>
          </li>
          <li className='menu-item'>
            <Link to='/about'>
              <i className='icon fas fa-ellipsis-h'></i>
              <span className='menu-item_label'>About</span>
            </Link>
          </li>
          <li className='menu-item' onClick={logoutHandler}>
            <i className='icon fas fa-sign-out-alt'></i>
            <span className='menu-item_label'>Logout</span>
          </li>
        </ul>
      )}
    </Navigation>
  );
};

export default Navbar;
