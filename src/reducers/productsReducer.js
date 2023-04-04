import { SET_PRODUCTS } from '../utils/actions';

const globalReducer = (state, action) => {
  if (action.type === SET_PRODUCTS) {
    return { ...state, products: action.payload };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
