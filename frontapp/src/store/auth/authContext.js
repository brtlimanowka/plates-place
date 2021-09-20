import React, { createContext, useReducer } from 'react';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthContextProvider = (props) => {
  const AuthContext = createContext();
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerUser = (formData) => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        dispatch({ type: REGISTER_SUCCESS, payload: data.token });
        getUser();
      })
      .catch((error) => dispatch({ type: REGISTER_FAIL, payload: error }));
  };

  const logIn = (formData) => {
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        dispatch({ type: LOGIN_SUCCESS, payload: data.token });
        getUser();
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAIL, payload: error });
      });
  };

  const logOut = () => {
    dispatch({ type: LOGOUT });
  };

  const getUser = () => {
    let token = localStorage.getItem('token');
    fetch('/api/auth', {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        dispatch({ type: USER_LOADED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: AUTH_ERROR, payload: error });
      });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const contextValues = {
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    error: state.error,
    registerUser,
    getUser,
    logIn,
    logOut,
    clearErrors,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
