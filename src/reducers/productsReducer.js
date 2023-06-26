import {
  SET_SEARCHED_PRODUCTS,
  SET_SEARCHED_PRODUCTS_LOADING,
  SET_SEARCH_TERM,
  SET_PRODUCTS,
  EMPTY_SEARCH_TERM,
} from '../utils/actions';

const globalReducer = (state, action) => {
  if (action.type === SET_PRODUCTS) {
    return { ...state, products: action.payload };
  }

  if (action.type === SET_SEARCHED_PRODUCTS) {
    if (!state.searchTerm) {
      return { ...state, searchedProducts: [] };
    }

    return { ...state, searchedProducts: action.payload };
  }
  if (action.type === SET_SEARCH_TERM) {
    return {
      ...state,
      searchTerm: action.payload,
    };
  }

  if (action.type === SET_SEARCHED_PRODUCTS_LOADING) {
    return {
      ...state,
      searchProductsLoading: action.payload,
    };
  }

  if (action.type === EMPTY_SEARCH_TERM) {
    return {
      ...state,
      searchTerm: '',
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
