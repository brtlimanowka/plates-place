import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Theme from './Theme';
import AuthContext from './store/auth/authContext';
import SettingsContext from './store/settings/settingsContext';
import WorkoutContext from './store/workout/workoutContext';
import PrivateRoute from './components/ui/PrivateRoute';
import Auth from './components/pages/auth/Auth';
import Navbar from './components/ui/Navbar';
import Planner from './components/pages/Planner';
import Workouts from './components/pages/workouts/Workouts';
import Stopwatch from './components/pages/Stopwatch';
import Settings from './components/pages/settings/Settings';
import About from './components/pages/About';
import ResetPassword from './components/pages/auth/ResetPassword';
import './App.css';

function App() {
  const authContext = useContext(AuthContext);
  const settingsContext = useContext(SettingsContext);
  const workoutContext = useContext(WorkoutContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authContext.getUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (authContext.user) {
      settingsContext.getSettings(authContext.user._id);
      workoutContext.getWorkouts(authContext.user._id);
    }
    // eslint-disable-next-line
  }, [authContext.user]);

  return (
    <Theme>
      <div className='App'>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/login' component={Auth} />
              <PrivateRoute exact path='/' component={Planner} />
              <PrivateRoute exact path='/workouts' component={Workouts} />
              <PrivateRoute exact path='/stopwatch' component={Stopwatch} />
              <PrivateRoute exact path='/settings' component={Settings} />
              <PrivateRoute exact path='/about' component={About} />
              <Route path='/reset/:manageString?' component={ResetPassword} />
            </Switch>
          </div>
        </Router>
      </div>
    </Theme>
  );
}

export default App;
