import { axiosInstance } from '../axios/instance';
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from '../reducers/authReducer';
import { SET_USER } from '../utils/actions';

const getInfoFromLocalStorage = () => {
  let info = localStorage.getItem('info');
  if (info) {
    return JSON.parse(info);
  } else {
    return {};
  }
};

const initialState = {
  user: {
    info: getInfoFromLocalStorage(),
  },
};

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refreshToken = async (link) => {
    try {
      const { data } = await axiosInstance.post(`/${link}/token`);
      dispatch({ type: SET_USER, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: SET_USER });
    }
  };

  useEffect(() => {
    refreshToken(state.user?.info);
    console.log('initial token refresh');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.user.email) {
        refreshToken(state.user?.role);
        console.log('Token refreshed');
      }
    }, 780000);
    return () => clearInterval(interval);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { useAuthContext, AuthProvider };
