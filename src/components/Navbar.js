import React from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { BsSun } from 'react-icons/bs';
import { GiMoon } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Wrapper>
      <div className='container'>
        <h1 className='logo'>ASSOH</h1>
        <form method='post'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search for a product'
          />
          <AiOutlineSearch />
        </form>
        <div className='category-container'>
          <p className='category'>Category</p>
          <div className='categories'></div>
        </div>
        <Link to={'/'}>Contact Us</Link>
        <Link to={'/'}>Help</Link>
        <Link to={'/'} className='login'>
          Login
        </Link>
        <Link to={'/cart'}>
          <p>Cart</p>
          <AiOutlineShoppingCart />
        </Link>
        <Link to={'account'}>Account</Link>
        <button>
          <BsSun />
        </button>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav``;
