import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import { CircularProgress } from '@mui/material';
import { ErrorMessage } from './index';

const CategoriesList = () => {
  const { categories, categoriesLoading, categoriesError } = useGlobalContext();

  if (categoriesLoading) {
    return (
      <Wrapper>
        <CircularProgress className='center' />
      </Wrapper>
    );
  }

  if (categoriesError) {
    return (
      <Wrapper>
        <ErrorMessage message={categoriesError} direction='column' />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <Link
            to={'/products'}
            state={{ name: '', page: 1, category: category.id }}
            key={category.id}
          >
            {category.name}
          </Link>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--lightgrey);
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid black;

  position: absolute;
  top: 100%;
  right: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, 0);
  width: 250%;
  display: none;

  a {
    display: block;
    margin: 10px 0;
    padding: 5px 0;
    /* color: var(--black); */
    font-weight: bold;
    transition: padding 0.3s linear;
  }

  a:hover {
    padding-left: 10px;
  }
`;

export default CategoriesList;
