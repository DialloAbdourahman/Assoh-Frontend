import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Wrapper>
      <div className='container'>
        <h1>-ASSOH-</h1>
        <aside>
          <Link>Seller</Link>
          <Link>Buyer</Link>
          <Link>
            <button>Contact Us</button>
          </Link>
        </aside>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  width: 100%;
  background-color: var(--grey);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }
  h1 {
    color: var(--black);
    font-size: var(--largeFontSize);
    font-weight: var(--largeFontWeight);
  }

  a {
    text-decoration: none;
    color: black;
    font-size: var(--smallFontSize);
    font-weight: var(--normalFontWeight);
    margin-left: 40px;
    color: black;
  }

  button {
    background-color: black;
    color: white;
    border: none;
    outline: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: var(--largeFontWeight);
  }
`;
