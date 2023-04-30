import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import { useProductsContext } from '../contexts/productsContext';
import {
  OPEN_SIDEBAR,
  TOGGLE_THEME,
  CLOSE_SIDEBAR,
  SET_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  SET_SEARCH_TERM,
  EMPTY_SEARCH_TERM,
} from '../utils/actions';
import { SearchList, MobileSearch, CategoriesList } from './index';
import OutsideAlerterAccountInfo from './OutsideAlerterAccountInfo';
import { API_LINK } from '../utils/constants';
import axios from 'axios';
import AccountInfo from './AccountInfo';

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const { light, user, dispatch } = useGlobalContext();
  const { searchTerm, dispatch: dispatchProductContext } = useProductsContext();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate('/products', {
      state: { name: searchTerm, page: 1, category: '' },
    });

    dispatchProductContext({ type: EMPTY_SEARCH_TERM });
  };

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth > 500) {
        setShowMobileSearch(false);
        dispatch({ type: CLOSE_SIDEBAR });
      }
    };

    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [dispatch]);

  return (
    <Wrapper
      style={{
        background: `${light ? 'var(--darkblue)' : 'var(--lightblack)'}`,
      }}
    >
      <div className='container'>
        <h1 className='logo'>
          <Link to={'/'}>ASSOH</Link>
        </h1>
        <form
          method='post'
          className='search-form'
          onSubmit={handleSearchSubmit}
        >
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search for a product'
            autoComplete='off'
            value={searchTerm}
            onChange={(e) =>
              dispatchProductContext({
                type: SET_SEARCH_TERM,
                payload: e.target.value,
              })
            }
          />
          <button type='submit' className='search-icon'>
            <AiOutlineSearch />
          </button>
          <SearchList />
        </form>
        <button
          type='submit'
          className='search-mobile-button'
          onClick={() => setShowMobileSearch(true)}
        >
          <AiOutlineSearch />
        </button>
        <div className='category-container'>
          <p className='category'>Category</p>
          <CategoriesList />
        </div>
        <NavLink
          to={'/contact'}
          className={({ isActive }) =>
            isActive ? 'contact-us active-link' : 'contact-us'
          }
        >
          Contact Us
        </NavLink>
        <NavLink
          to={'/help'}
          className={({ isActive }) => (isActive ? 'help active-link' : 'help')}
        >
          Help
        </NavLink>
        {!user.email && (
          <NavLink
            to={'/login'}
            className={({ isActive }) =>
              isActive ? 'login active-link' : 'login'
            }
          >
            Log in
          </NavLink>
        )}
        <NavLink
          to={'/cart'}
          className={({ isActive }) => (isActive ? 'cart active-link' : 'cart')}
        >
          <p className='cart-text'>Cart</p>
          <AiOutlineShoppingCart className='cart-icon' />
          <div className='cart-number'>
            <span>6</span>
          </div>
        </NavLink>
        {user.email && (
          <button
            className='account'
            onClick={() => setShowAccountInfo(!showAccountInfo)}
          >
            {user.name.substring(0, 1)}
          </button>
        )}
        {showAccountInfo && (
          <AccountInfo setShowAccountInfo={setShowAccountInfo} />
        )}
        <button
          className='theme'
          onClick={() => {
            dispatch({ type: TOGGLE_THEME });
            localStorage.setItem('light', `${!light}`);
          }}
        >
          {light ? <MdDarkMode /> : <MdLightMode />}
        </button>
        <button
          className='toggle-sidebar'
          onClick={() => {
            dispatch({ type: OPEN_SIDEBAR });
          }}
        >
          <GiHamburgerMenu />
        </button>
      </div>
      {showMobileSearch && (
        <MobileSearch
          showMobileSearch={showMobileSearch}
          setShowMobileSearch={setShowMobileSearch}
        />
      )}
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  color: white;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }

  .cart-icon {
    font-size: 25px;
    margin-left: 3px;
    color: var(--orange);
  }

  .cart-number {
    background-color: var(--lightgrey);
    border-radius: 50%;
    padding: 1px 2px;
    color: var(--darkblue);
    position: absolute;
    right: -14%;
    top: -30%;
    font-size: 16px;
    font-weight: bolder;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .theme {
    background-color: transparent;
    border: none;
    font-size: 25px;
    color: white;
  }

  .search-form {
    position: relative;
    width: 35%;
    display: flex;
    align-items: center;
    padding: 15px 0;
  }

  .search-form input {
    padding: 7px 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  .search-icon {
    position: absolute;
    right: 10px;
    top: 23px;
    background-color: transparent;
    border: none;
    color: var(--darkblue);
  }

  .search-mobile-button {
    background-color: transparent;
    border: none;
    color: var(--lightgrey);
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
  }

  .login {
    border: 1px solid var(--orange);
    border-radius: 15px;
    padding: 5px 10px;
    background-color: transparent;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .toggle-sidebar {
    background-color: transparent;
    border: none;
    outline: none;
    color: var(--lightgrey);
    font-size: 30px;
    display: none;
  }

  .category-container {
    cursor: pointer;
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    padding: 15px 0;
  }

  .category-container:hover div {
    display: block;
  }

  .category-container:hover .category {
    color: var(--orange);
  }

  a {
    text-decoration: none;
  }

  .category:hover,
  .login:hover,
  .contact-us:hover,
  .cart:hover,
  .help:hover {
    transition: color 0.2s linear;
    color: var(--orange);
  }

  .active-link {
    color: var(--orange);
  }

  .account {
    background-color: var(--orange);
    color: white;
    padding: 2px 8px;
    border-radius: 50%;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
    position: relative;
  }

  .logo a,
  .cart,
  .help,
  .contact-us {
    color: white;
  }

  @media (max-width: 900px) {
    .cart-text {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .contact-us,
    .help {
      display: none;
    }

    .search-form {
      width: 50%;
    }
  }

  @media (max-width: 700px) {
    .theme {
      display: none;
    }

    .toggle-sidebar {
      display: block;
    }
  }

  @media (max-width: 650px) {
    .category-container {
      display: none;
    }
  }

  @media (max-width: 500px) {
    padding: 10.5px 0;

    .search-form {
      display: none;
    }

    .search-mobile-button {
      display: block;
    }

    .login {
      display: none;
    }

    .account {
      display: none;
    }

    .logo {
      flex-grow: 0.5;
    }
  }
`;
