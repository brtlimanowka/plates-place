import React from 'react';
import ReactDOM from 'react-dom';
import AuthState from './store/auth/AuthState';
import SettingsState from './store/settings/SettingsState';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <SettingsState>
        <App />
      </SettingsState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
