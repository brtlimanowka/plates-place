import React, { useReducer } from 'react';
import SettingsContext from './settingsContext';
import settingsReducer from './settingsReducer';
import {
  START_LOADING,
  CLEAR_ERRORS,
  SETTINGS_LOADED,
  SETTINGS_FAIL,
  SETTINGS_UPDATED,
} from '../types';

const SettingsState = (props) => {
  const initialState = {
    isLoading: false,
    settings: null,
    error: null,
  };

  const [state, dispatch] = useReducer(settingsReducer, initialState);

  const startLoading = () => {
    dispatch({ type: START_LOADING });
  };
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  const getSettings = (userId) => {
    fetch(`/api/settings/${userId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({ type: SETTINGS_FAIL, payload: response.message });
        }
      })
      .then((data) => {
        dispatch({ type: SETTINGS_LOADED, payload: data });
      });
  };
  const saveSettings = (formData) => {
    // fetch
    if (true) {
      dispatch({ type: SETTINGS_UPDATED, payload: formData });
    } else {
      dispatch({ type: SETTINGS_FAIL, payload: null });
    }
  };

  const contextValues = {
    isLoading: state.isLoading,
    settings: state.settings,
    error: state.error,
    startLoading,
    clearErrors,
    getSettings,
    saveSettings,
  };

  return (
    <SettingsContext.Provider value={contextValues}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
