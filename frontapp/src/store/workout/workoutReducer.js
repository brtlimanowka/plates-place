import {
  START_LOADING,
  CLEAR_ERRORS,
  WORKOUTS_LOADED,
  WORKOUT_CREATED,
  WORKOUT_UPDATED,
  WORKOUT_DELETED,
} from '../types';

const _ = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case WORKOUTS_LOADED:
      return {
        ...state,
        isLoading: false,
        workouts: action.payload,
        error: null,
      };
    case WORKOUT_CREATED:
      return {
        ...state,
        isLoading: false,
        workouts: [action.payload, ...state.workouts],
        error: null,
      };
    case WORKOUT_UPDATED:
      return {
        ...state,
        isLoading: false,
        workouts: state.workouts.map((workout) =>
          workout._id === action.payload._id ? action.payload : workout
        ),
        error: null,
      };
    case WORKOUT_DELETED:
      return {
        ...state,
        isLoading: false,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
        error: null,
      };
    default:
      return state;
  }
};

export default _;
