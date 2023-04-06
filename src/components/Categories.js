import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { SmallLoading, ErrorMessage } from '../components';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { categories, categoriesLoading, categoriesError } = useGlobalContext();

  if (categoriesLoading) {
    return <SmallLoading />;
  }

  if (categoriesError) {
    return (
      <Wrapper>
        <ErrorMessage message={categoriesError} direction='column' />
      </Wrapper>
    );
  }

  return (
    <Wrapper className='container'>
      <h1>Shop by Category</h1>
      <div className='grid'>
        {categories.map((category) => {
          return (
            <Link
              to={'/products'}
              state={{ name: '', page: 1, category: category.id }}
              className='category'
              key={category.id}
            >
              <h2>{category.name}</h2>
              <img src={category.imageUrl} alt='' />
              <button className='link'>See more</button>
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  color: var(--black);

  h1 {
    margin: 20px 0;
    font-size: 25px;
    /* font-weight: normal; */
    text-align: center;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 30px;
  }

  h2 {
    margin: 5px 0;
    color: var(--black);
    font-weight: normal;
  }

  .category {
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px var(--lightblack);
  }

  .category:hover {
    transition: all 0.3s linear;
    transform: translateY(-3%);
  }

  .category img {
    align-self: center;
    margin: 10px 0;
    width: 100%;
  }

  a {
    text-decoration: none;
  }
  a:active,
  a:focus {
    color: transparent;
  }

  .category .link {
    display: block;
    text-decoration: none;
    font-size: 18px;
    color: var(--orange);
    text-align: left;
    background-color: transparent;
    border: none;
    outline: none;
  }

  @media (max-width: 1250px) {
    .grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (max-width: 950px) {
    .grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 650px) {
    .grid {
      grid-template-columns: 1fr;
      justify-items: center;
    }
    .category {
      width: 80%;
    }
  }

  @media (max-width: 450px) {
    .category {
      width: 90%;
    }
  }
`;

export default Categories;
