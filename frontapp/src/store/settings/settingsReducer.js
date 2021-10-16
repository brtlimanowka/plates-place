import {
  START_LOADING,
  CLEAR_ERRORS,
  SETTINGS_LOADED,
  SETTINGS_FAIL,
  SETTINGS_UPDATED,
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
    case SETTINGS_LOADED:
      return {
        ...state,
      };
    case SETTINGS_FAIL:
      return {
        ...state,
      };
    case SETTINGS_UPDATED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default _;
