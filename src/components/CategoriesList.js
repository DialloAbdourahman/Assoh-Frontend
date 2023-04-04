import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';

const CategoriesList = () => {
  const { categories, categoriesLoading } = useGlobalContext();

  if (categoriesLoading) {
    return <h1>Loading...</h1>;
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

  .category {
    color: var(--black);
  }

  a {
    display: block;
    margin: 10px 0;
    padding: 5px 0;
    /* color: var(--black); */
    font-weight: bold;
    transition: padding 0.3s linear;
    /* color: black; */
  }

  a:hover {
    padding-left: 10px;
  }
`;

export default CategoriesList;
