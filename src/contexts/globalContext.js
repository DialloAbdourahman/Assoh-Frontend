import { axiosInstance } from '../axios/instance';
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/globalReducer';
import {
  SET_CATEGORIES,
  SET_CATEGORIES_LOADING,
  SET_CATEGORIES_ERROR,
} from '../utils/actions';

const getThemeFromLocalStorage = () => {
  let light = localStorage.getItem('light');
  if (light) {
    let boolValue = light === 'true';
    return boolValue;
  } else {
    return true;
  }
};

const initialState = {
  light: getThemeFromLocalStorage(),
  sidebar: false,
  loading: false,

  categories: [],
  categoriesLoading: false,
  categoriesError: '',
};

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCategories = async () => {
    try {
      dispatch({ type: SET_CATEGORIES_LOADING, payload: true });
      const categories = await axiosInstance.get(`/categories`);

      dispatch({ type: SET_CATEGORIES, payload: categories.data });
      dispatch({ type: SET_CATEGORIES_LOADING, payload: false });
      dispatch({ type: SET_CATEGORIES_ERROR, payload: '' });
    } catch (error) {
      dispatch({ type: SET_CATEGORIES_LOADING, payload: false });
      dispatch({ type: SET_CATEGORIES_ERROR, payload: `${error.message}` });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { useGlobalContext, GlobalProvider };
