import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const CategoriesList = () => {
  return (
    <Wrapper>
      <Link to={'/'}>Electronics</Link>
      <Link to={'/'}>Beauty</Link>
      <Link to={'/'}>Fashion</Link>
      <Link to={'/'}>Sports</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--lightgrey);
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid black;

  a {
    display: block;
    margin: 10px 0;
    padding: 5px 0;
    color: var(--black);
    font-weight: bold;
    transition: padding 0.3s linear;
  }

  a:hover {
    padding-left: 10px;
  }
`;

export default CategoriesList;
