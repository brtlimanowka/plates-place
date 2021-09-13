import React from 'react';
import CenteredCard from '../ui/templates/CenteredCard';
import AuthForm from './AuthForm';
import classes from './css/Authentication.module.css';

const Authentication = () => {
  return (
    <CenteredCard height={'100vh'}>
      <main className={classes.card}>
        <header>
          <h1>Welcome to Plates' Place</h1>
          <h3>An online PPL program planner</h3>
        </header>
        <AuthForm />
      </main>
    </CenteredCard>
  );
};

export default Authentication;
