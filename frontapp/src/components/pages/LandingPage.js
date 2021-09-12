import React from 'react';
import CenteredCard from '../ui/templates/CenteredCard';
import SignupForm from './SignupForm';
import classes from './css/LandingPage.module.css';

const LandingPage = () => {
  return (
    <CenteredCard height={'100vh'}>
      <main className={classes.card}>
        <header>
          <h1>Welcome to Plates' Place</h1>
          <h3>An online PPL program planner</h3>
        </header>
        <SignupForm />
      </main>
    </CenteredCard>
  );
};

export default LandingPage;
