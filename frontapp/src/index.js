import React from 'react';
import ReactDOM from 'react-dom';
import AuthState from './store/auth/AuthState';
import SettingsState from './store/settings/SettingsState';
import WorkoutState from './store/workout/WorkoutState';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <AuthState>
      <SettingsState>
        <WorkoutState>
          <App />
        </WorkoutState>
      </SettingsState>
    </AuthState>
  </React.StrictMode>,
  document.getElementById('root')
);
