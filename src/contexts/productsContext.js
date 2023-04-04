import axios from 'axios';
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/productsReducer';
import { API_LINK } from '../utils/constants';
import {} from '../utils/actions';

const initialState = {
  products: [],
  single_product: {},
};

const ProductContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
