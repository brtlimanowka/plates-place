import React from 'react';
import CenteredCard from '../../styles/CenteredCard.styled';
import AuthForm from './AuthForm';
import classes from '../css/Authentication.module.css';

const Authentication = () => {
  return (
    <CenteredCard>
      <main className={classes.card}>
        <header>
          <h1>Welcome to Plates' Place</h1>
          <h3>An online home gym PPL program planner</h3>
        </header>
        <AuthForm />
      </main>
    </CenteredCard>
  );
};

export default Authentication;
