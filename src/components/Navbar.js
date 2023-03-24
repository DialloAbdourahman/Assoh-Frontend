import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import { OPEN_SIDEBAR, TOGGLE_THEME, CLOSE_SIDEBAR } from '../utils/actions';
import CategoriesList from './CategoriesList';
import SearchList from './SearchList';
import MobileSearch from './MobileSearch';

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { light, user, dispatch } = useGlobalContext();

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
  }, []);

  return (
    <Wrapper
      style={{
        background: `${light ? 'var(--darkblue)' : 'var(--lightblack)'}`,
      }}
    >
      <div className='container'>
        <h1 className='logo'>ASSOH</h1>
        <form method='post' className='search-form'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search for a product'
            autoComplete='off'
          />
          <button type='submit' className='search-icon'>
            <AiOutlineSearch />
          </button>
          {/* <SearchList /> */}
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
        <Link to={'/'} className='contact-us'>
          Contact Us
        </Link>
        <Link to={'/'} className='help'>
          Help
        </Link>
        {!user && (
          <Link to={'/login'} className='login'>
            Login
          </Link>
        )}
        <Link to={'/cart'} className='cart'>
          <p className='cart-text'>Cart</p>
          <AiOutlineShoppingCart className='cart-icon' />
          <div className='cart-number'>
            <span>6</span>
          </div>
        </Link>
        {user && <Link to={'account'}>{user}</Link>}
        <button
          className='theme'
          onClick={() => dispatch({ type: TOGGLE_THEME })}
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
  color: var(--lightgrey);
  transition: var(--themetransitionspeed);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    color: var(--orange);
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
    border: 2px solid var(--orange);
    border-radius: 5px;
    padding: 5px 10px;
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

  .category-container div {
    position: absolute;
    top: 90%;
    right: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 250%;
    display: none;
  }

  .category-container:hover .category {
    color: var(--orange);
  }

  a {
    color: var(--lightgrey);
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
    padding: 10px 0;

    .search-form {
      display: none;
    }

    .search-mobile-button {
      display: block;
    }

    .login {
      display: none;
    }

    .logo {
      flex-grow: 0.5;
    }
  }
`;
