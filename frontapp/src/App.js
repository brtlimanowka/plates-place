import React from 'react';
import AuthContextProvider from './store/auth/authContext';
import Authentication from './components/pages/auth/Authentication';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Authentication />
      </div>
    </AuthContextProvider>
  );
}

export default App;
