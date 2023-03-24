import { OPEN_SIDEBAR, TOGGLE_THEME, CLOSE_SIDEBAR } from '../utils/actions';

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

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
