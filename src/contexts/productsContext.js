import axios from 'axios';
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/productsReducer';
import { API_LINK } from '../utils/constants';
import {
  SET_SEARCHED_PRODUCTS_LOADING,
  SET_SEARCHED_PRODUCTS,
} from '../utils/actions';

const initialState = {
  products: [],
  searchProductsLoading: false,
  single_product: {},
  searchTerm: '',
  searchedProducts: [],
};

const ProductContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchProducts = async () => {
    try {
      dispatch({ type: SET_SEARCHED_PRODUCTS_LOADING, payload: true });

      const { data } = await axios({
        method: 'get',
        url: `${API_LINK}/products/searchProduct?name=${state.searchTerm}`,
      });

      dispatch({ type: SET_SEARCHED_PRODUCTS, payload: data });
      dispatch({ type: SET_SEARCHED_PRODUCTS_LOADING, payload: false });
    } catch (error) {
      dispatch({ type: SET_SEARCHED_PRODUCTS_LOADING, payload: false });
    }
  };

  useEffect(() => {
    searchProducts();
  }, [state.searchTerm]);

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(ProductContext);
};

export { useProductsContext, ProductsProvider };
