import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContext from './store/auth/authContext';
import Navbar from './components/ui/elements/Navbar';
import Home from './components/pages/Home';
import Planner from './components/pages/Planner';
import Workouts from './components/pages/Workouts';
import Stopwatch from './components/pages/Stopwatch';
import Settings from './components/pages/Settings';
import About from './components/pages/About';
import ResetPassword from './components/pages/auth/ResetPassword';
import './App.css';

function App() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authContext.getUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/planner' component={Planner} />
            <Route exact path='/workouts' component={Workouts} />
            <Route exact path='/stopwatch' component={Stopwatch} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/about' component={About} />
            <Route exact path='/reset' component={ResetPassword} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
