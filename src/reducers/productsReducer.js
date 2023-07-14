import {
  SET_SEARCHED_PRODUCTS,
  SET_SEARCHED_PRODUCTS_LOADING,
  SET_SEARCH_TERM,
  SET_PRODUCTS,
  EMPTY_SEARCH_TERM,
  ADD_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  CALCULATE_CART_TOTAL,
  EMPTY_CART,
  INCREASE_CART_PRODUCT_AMOUNT,
  DECREASE_CART_PRODUCT_AMOUNT,
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
    if (action.payload?.amount) {
      return {
        ...state,
        cart: [
          ...state.cart,
          { ...action.payload, amount: parseInt(action.payload.amount) },
        ],
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, amount: 1 }],
      };
    }
  }

  if (action.type === REMOVE_PRODUCT_FROM_CART) {
    const id = action.payload;
    const cart = state.cart.filter((item) => item.id !== id);
    return { ...state, cart };
  }

  if (action.type === EMPTY_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === CALCULATE_CART_TOTAL) {
    const cartAmount = state.cart.reduce((total, item) => {
      total += item.amount;
      return total;
    }, 0);

    const cartTotalPrice = state.cart.reduce((total, item) => {
      total += item.price * item.amount;
      return total;
    }, 0);

    return { ...state, cartAmount, cartTotalPrice };
  }

  if (action.type === INCREASE_CART_PRODUCT_AMOUNT) {
    const id = action.payload.id;
    const productQuantity = action.payload.quantity;

    const cart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount + 1;

        if (newAmount > productQuantity) {
          newAmount = productQuantity;
        }

        return { ...item, amount: newAmount };
      }

      return item;
    });

    return { ...state, cart };
  }

  if (action.type === DECREASE_CART_PRODUCT_AMOUNT) {
    const id = action.payload.id;

    const cart = state.cart
      .map((item) => {
        if (item.id === id) {
          let newAmount = item.amount - 1;

          return { ...item, amount: newAmount };
        }

        return item;
      })
      .filter((item) => item.amount !== 0);

    return { ...state, cart };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default globalReducer;
