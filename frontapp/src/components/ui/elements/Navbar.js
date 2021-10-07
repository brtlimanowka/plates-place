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
          <i className={`${classes.icon} fas fa-dumbbell`}></i>
          <span className={classes.appname}>Plates' Place</span>
        </Link>
      </header>
      {authContext.isAuthenticated && (
        <ul className={classes.menu}>
          <li className={classes['menu-item']}>
            <Link to='/planner'>
              <i className={`${classes.icon} far fa-calendar-check`}></i>
              <span className={classes['menu-item_label']}>Plan My Week</span>
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/workouts'>
              <i className={`${classes.icon} fas fa-wrench`}></i>
              <span className={classes['menu-item_label']}>Workouts</span>
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/stopwatch'>
              <i className={`${classes.icon} fas fa-stopwatch`}></i>
              <span className={classes['menu-item_label']}>Stopwatch</span>
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/settings'>
              <i className={`${classes.icon} fas fa-sliders-h`}></i>
              <span className={classes['menu-item_label']}>Settings</span>
            </Link>
          </li>
          <li className={classes['menu-item']}>
            <Link to='/about'>
              <i className={`${classes.icon} fas fa-ellipsis-h`}></i>
              <span className={classes['menu-item_label']}>About</span>
            </Link>
          </li>
          <li className={classes['menu-item']} onClick={logoutHandler}>
            <i className={`${classes.icon} fas fa-sign-out-alt`}></i>
            <span className={classes['menu-item_label']}>Logout</span>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
