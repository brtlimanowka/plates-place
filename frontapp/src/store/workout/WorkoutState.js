import React, { useReducer } from 'react';
import WorkoutContext from './workoutContext';
import workoutReducer from './workoutReducer';
import {
  START_LOADING,
  CLEAR_ERRORS,
  WORKOUTS_LOADED,
  WORKOUT_CREATED,
  WORKOUT_UPDATED,
  WORKOUT_DELETED,
  WORKOUTS_FAIL,
  WORKOUTS_FILTER,
  WORKOUTS_SORT,
  WORKOUTS_SEARCH,
  WORKOUTS_CLEAR,
} from '../types';

const WorkoutState = (props) => {
  const initialState = {
    isLoading: false,
    workouts: null,
    error: null,
  };

  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const startLoading = () => {
    dispatch({ type: START_LOADING });
  };
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  const getWorkouts = (userId) => {
    fetch(`/api/workout/${userId}`, {
      headers: {
        'X-AUTH-TOKEN': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          dispatch({ type: WORKOUTS_FAIL, payload: response.message });
        }
      })
      .then((data) => dispatch({ type: WORKOUTS_LOADED, payload: data }));
  };
  const createWorkout = (workout) => {
    fetch('/api/workout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': localStorage.getItem('token'),
      },
      body: JSON.stringify(workout),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          dispatch({ type: WORKOUTS_FAIL, payload: result.status });
        }
      })
      .then((data) => dispatch({ type: WORKOUT_CREATED, payload: data }))
      .catch((error) => {
        console.error(error);
        dispatch({ type: WORKOUTS_FAIL, payload: error });
      });
  };
  const updateWorkout = (workout) => {
    fetch('/api/workout/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': localStorage.getItem('token'),
      },
      body: JSON.stringify(workout),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          dispatch({ type: WORKOUTS_FAIL, payload: result.status });
        }
      })
      .then((data) => dispatch({ type: WORKOUT_UPDATED, payload: data }))
      .catch((error) => {
        console.error(error);
        dispatch({ type: WORKOUTS_FAIL, payload: error });
      });
  };
  const deleteWorkout = (workoutId) => {
    fetch('/api/workout/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-AUTH-TOKEN': localStorage.getItem('token'),
      },
      body: JSON.stringify({ id: workoutId }),
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        } else {
          dispatch({ type: WORKOUTS_FAIL, payload: result.status });
        }
      })
      .then((data) => dispatch({ type: WORKOUT_DELETED, payload: workoutId }))
      .catch((error) => {
        console.error(error);
        dispatch({ type: WORKOUTS_FAIL, payload: error });
      });
  };

  const contextValues = {
    isLoading: state.isLoading,
    workouts: state.workouts,
    error: state.error,
    startLoading,
    clearErrors,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
  };

  return (
    <WorkoutContext.Provider value={contextValues}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutState;
