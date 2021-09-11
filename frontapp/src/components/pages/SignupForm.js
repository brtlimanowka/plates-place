import React from 'react';

const SignupForm = () => {
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <h3>Sign up</h3>
      <label htmlFor='email'>Email:</label>
      <input type='email' id='email' />
      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' />
      <button>Register</button>
    </form>
  );
};

export default SignupForm;
