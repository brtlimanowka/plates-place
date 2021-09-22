import React from 'react';
import AuthState from './store/auth/AuthState';
import Authentication from './components/pages/auth/Authentication';
import './App.css';

function App() {
  return (
    <AuthState>
      <div className='App'>
        <Authentication />
      </div>
    </AuthState>
  );
}

export default App;
