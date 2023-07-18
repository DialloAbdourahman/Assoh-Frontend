import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SellerDashboardLeft = () => {
  return (
    <Wrapper>
      <NavLink
        to={'statistics'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Statistics
      </NavLink>
      <br />
      <NavLink
        to={'products'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Products
      </NavLink>
      <br />
      <NavLink
        to={'orders'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Orders
      </NavLink>
      <br />
      <NavLink
        to={'sellerPayments'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Payment Methods
      </NavLink>
      <br />
    </Wrapper>
  );
};

export default SellerDashboardLeft;

const Wrapper = styled.section`
  background-color: var(--orange);
  width: 20%;
  padding: 10px;

  a {
    margin: 10px 0;
    display: block;
    font-size: 20px;
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: var(--darkblue);
    transition: color 0.2s linear;
  }

  .active-link {
    color: var(--darkblue);
  }
`;
