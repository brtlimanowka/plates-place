import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  START_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isLoading: false,
    isRegistered: false,
    isAuthenticated: false,
    isPasswordResetRequested: false,
    isPasswordResetSuccessful: false,
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
          dispatch({ type: REGISTER_SUCCESS });
        } else {
          throw new Error(response.statusText);
        }
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
    dispatch({ type: START_LOADING });
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

  const requestPasswordReset = (formData) => {
    fetch('/api/auth/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          dispatch({ type: REQUEST_PASSWORD_RESET });
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => dispatch({ type: AUTH_ERROR, payload: error }));
  };

  const resetPassword = ({ manageString, password }) => {
    fetch('/api/users/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ manageString, password }),
    })
      .then((response) => {
        if (response.ok) {
          dispatch({ type: RESET_PASSWORD });
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => dispatch({ type: AUTH_ERROR, payload: error }));
  };

  const startLoading = () => {
    dispatch({ type: START_LOADING });
  };

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  const contextValues = {
    token: state.token,
    isRegistered: state.isRegistered,
    isAuthenticated: state.isAuthenticated,
    isPasswordResetRequested: state.isPasswordResetRequested,
    isPasswordResetSuccessful: state.isPasswordResetSuccessful,
    isLoading: state.isLoading,
    user: state.user,
    error: state.error,
    startLoading,
    registerUser,
    getUser,
    logIn,
    logOut,
    requestPasswordReset,
    resetPassword,
    clearErrors,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
