import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContext from './context/auth/AuthState';

ReactDOM.render(
  <AuthContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContext>,
  document.getElementById('root')
);
