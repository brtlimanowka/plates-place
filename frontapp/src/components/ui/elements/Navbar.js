import React, { useContext } from 'react';
import AuthContext from '../../../store/auth/authContext';
import { Link } from 'react-router-dom';
import classes from './css/Navbar.module.css';

const Navbar = () => {
  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.logOut();
  };

  return (
    <nav className={classes.navbar}>
      <header>
        <Link to='/'>
          <i className='fas fa-dumbbell'></i>Plates' Place
        </Link>
      </header>
      {authContext.isAuthenticated && (
        <ul className={classes.menu}>
          <li className={classes['menu-item']}>
            <Link to='/planner'>
              <i className={`${classes.icon} far fa-calendar-check`}></i>Plan My
              Week
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/workouts'>
              <i className={`${classes.icon} fas fa-wrench`}></i>Configure
              Workouts
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/stopwatch'>
              <i className={`${classes.icon} fas fa-stopwatch`}></i>Stopwatch
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/settings'>
              <i className={`${classes.icon} fas fa-sliders-h`}></i>Settings
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/about'>
              <i className={`${classes.icon} fas fa-ellipsis-h`}></i>About
            </Link>
          </li>
          <li className={classes['menu-item']} onClick={logoutHandler}>
            <i className={`${classes.icon} fas fa-sign-out-alt`}></i>Logout
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
