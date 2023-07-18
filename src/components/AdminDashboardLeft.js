import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AdminDashboardLeft = () => {
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
        to={'sellers'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Sellers
      </NavLink>
      <br />
      <NavLink
        to={'customers'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Customers
      </NavLink>
      <br />
      <NavLink
        to={'products'}
        className={({ isActive }) => (isActive ? 'link active-link' : 'link')}
      >
        Products
      </NavLink>
    </Wrapper>
  );
};

export default AdminDashboardLeft;

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
