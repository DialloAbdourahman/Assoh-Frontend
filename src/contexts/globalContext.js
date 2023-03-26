import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/globalReducer';
import {} from '../utils/actions';

const getUserFromLocalStorage = () => {
  let user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else {
    return {};
  }
};

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
  user: getUserFromLocalStorage(),
  light: getThemeFromLocalStorage(),
  sidebar: false,
};

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
