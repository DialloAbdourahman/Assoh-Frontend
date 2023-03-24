import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SearchList = () => {
  return (
    <Wrapper>
      <Link to={'/'}>Search option 1</Link>
      <Link to={'/'}>Search option 2</Link>
      <Link to={'/'}>Search option 3</Link>
      <Link to={'/'}>Search option 4</Link>
      <Link to={'/'}>Search option 5</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 90%;
  width: 100%;
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
    transition: transform 0.3s linear;
  }

  a:hover {
    transform: translateX(3%);
  }
`;

export default SearchList;
