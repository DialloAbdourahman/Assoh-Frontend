import { SET_USER } from '../utils/actions';

const authReducer = (state, action) => {
  if (action.type === SET_USER) {
    if (!action.payload) {
      return { ...state, user: {} };
    }
    return { ...state, user: action.payload };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default authReducer;
