import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import {
  CLOSE_SIDEBAR,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_USER,
} from '../utils/actions';
import { API_LINK } from '../utils/constants';

const Sidebar = () => {
  const { sidebar, dispatch, categories, user } = useGlobalContext();
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      await axios({
        method: 'POST',
        url: `${API_LINK}/users/logout`,
        headers: { Authorization: 'Bearer ' + user.token },
      });

      localStorage.removeItem('user');
      dispatch({ type: SET_USER });
      dispatch({ type: SET_LOADING_FALSE });
      navigate('/login');
    } catch (error) {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper
      style={{
        transform: `${
          sidebar === true ? 'translateX(0)' : 'translateX(-100%)'
        }`,
      }}
    >
      <div className='inside-sidebar'>
        <div className='top-btn'>
          <button onClick={() => dispatch({ type: CLOSE_SIDEBAR })}>
            close
          </button>
        </div>
        <button onClick={() => setCategoriesOpen(!categoriesOpen)}>
          Categories
        </button>
        {categoriesOpen && (
          <div className='categoriesLinks'>
            {categories.map((category) => {
              return (
                <Link
                  to={'/products'}
                  state={{ name: '', page: 1, category: category.id }}
                  key={category.id}
                  onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        )}
        {user.email && (
          <Link
            to={'/account'}
            onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
            className='account'
          >
            Account
          </Link>
        )}
        {!user.email && (
          <Link
            to={'/login'}
            className='login'
            onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
          >
            Login
          </Link>
        )}
        {!user.email && (
          <Link
            to={'/signup'}
            className='signup'
            onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
          >
            Signup
          </Link>
        )}
        <Link to={'/contact'} onClick={() => dispatch({ type: CLOSE_SIDEBAR })}>
          Contact Us
        </Link>
        <Link to={'/help'} onClick={() => dispatch({ type: CLOSE_SIDEBAR })}>
          Help
        </Link>
        {user.email && <button onClick={logout}>Logout</button>}
        <button className='theme'>theme</button>
      </div>
      <div
        className='outside-sidebar'
        onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
      ></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.1s ease-in;
  z-index: 500;
  display: none;

  .inside-sidebar {
    background-color: var(--lightgrey);
    width: 60%;
    height: 100%;
    position: absolute;
    left: 0;
    padding: 20px;
  }

  .outside-sidebar {
    background: var(--transparentbackground);
    width: 40%;
    height: 100%;
    position: absolute;
    right: 0;
  }

  .account {
    display: none;
  }

  .login,
  .signup {
    display: none;
  }

  a,
  button {
    display: block;
  }

  @media (max-width: 700px) {
    display: block;
  }

  @media (max-width: 500px) {
    .account {
      display: block;
    }
    .login,
    .signup {
      display: block;
    }
  }
`;

export default Sidebar;
