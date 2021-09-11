import React from 'react';
import CenteredCard from '../ui/templates/CenteredCard';
// import SignupForm from './SignupForm';
import frogImage from '../../assets/1606476323206.gif';
import classes from './css/LandingPage.module.css';

const LandingPage = () => {
  return (
    <CenteredCard height={'100vh'}>
      <main className={classes.card}>
        <img src={frogImage} alt='żabe' />
        <h1>Welcome to Plates' Place</h1>
        <h3>An online PPL program planner</h3>
        {/* <SignupForm /> */}
      </main>
    </CenteredCard>
  );
};

export default LandingPage;
