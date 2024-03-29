import {
  OPEN_SIDEBAR,
  TOGGLE_THEME,
  CLOSE_SIDEBAR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES_ERROR,
} from '../utils/actions';

const globalReducer = (state, action) => {
  if (action.type === TOGGLE_THEME) {
    return { ...state, light: !state.light };
  }

  if (action.type === OPEN_SIDEBAR) {
    return { ...state, sidebar: true };
  }

  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, sidebar: false };
  }

  if (action.type === SET_LOADING_TRUE) {
    return { ...state, loading: true };
  }

  if (action.type === SET_LOADING_FALSE) {
    return { ...state, loading: false };
  }

  if (action.type === SET_CATEGORIES) {
    return {
      ...state,
      categories: action.payload,
    };
  }

  if (action.type === SET_CATEGORIES_LOADING) {
    return {
      ...state,
      categoriesLoading: action.payload,
    };
  }

  if (action.type === SET_CATEGORIES_ERROR) {
    return {
      ...state,
      categoriesError: action.payload,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
