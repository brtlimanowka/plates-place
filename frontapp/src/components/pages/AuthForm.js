import React, { useState, useRef } from 'react';
import classes from './css/AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const formData = {
      name: nameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    fetch(isLogin ? '/api/auth/' : '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className={classes['form-container']}>
      <form onSubmit={submitHandler}>
        <h2 className={classes.header}>{isLogin ? 'Login' : 'Sign up'}</h2>
        <div className={classes['form-group']}>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' ref={nameInputRef} />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' ref={passwordInputRef} />
        </div>
        <div className={classes['form-actions']}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button type='button' onClick={switchModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
