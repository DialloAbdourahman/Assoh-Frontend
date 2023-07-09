import {
  SET_SEARCHED_PRODUCTS,
  SET_SEARCHED_PRODUCTS_LOADING,
  SET_SEARCH_TERM,
  SET_PRODUCTS,
  EMPTY_SEARCH_TERM,
  ADD_TO_CART,
  REMOVER_FROM_CART,
  CALCULATE_CART_TOTAL,
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

  if (action.type === ADD_TO_CART) {
    return {
      ...state,
      cart: [...state.cart, { ...action.payload, amount: 1 }],
    };
  }

  if (action.type === REMOVER_FROM_CART) {
    const newCart = state.cart.filter((item) => item.id !== action.payload.id);
    return {
      ...state,
      cart: newCart,
    };
  }

  if (action.type === CALCULATE_CART_TOTAL) {
    const cartAmount = state.cart.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);

    return { ...state, cartAmount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
