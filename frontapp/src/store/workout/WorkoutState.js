import Ract, { useReducer } from 'react';
import WorkoutContext from './workoutContext';
import workoutReducer from './workoutReducer';
import {
  START_LOADING,
  CLEAR_ERRORS,
  WORKOUTS_LOADED,
  WORKOUT_CREATED,
  WORKOUT_UPDATED,
  WORKOUT_DELETED,
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
  const getWorkouts = (userId) => {};
  const createWorkout = (workout) => {};
  const updateWorkout = (workout) => {};
  const deleteWorkout = (workoutId) => {};

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
