import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SmallLoading, ErrorMessage } from '../components';
import { useGlobalContext } from '../contexts/globalContext';

const SubMenu = () => {
  const { categories, categoriesLoading, categoriesError } = useGlobalContext();

  if (categoriesLoading) {
    return <SmallLoading />;
  }

  if (categoriesError) {
    return (
      <Wrapper>
        <ErrorMessage message={categoriesError} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='container'>
        <button className='icon'>
          <GiHamburgerMenu />
        </button>
        {categories.map((category) => {
          return (
            <Link
              to={'/products'}
              state={{ name: '', page: 1, category: category.id }}
              className='category-link'
              key={category.id}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: var(--lightgrey);
  padding: 5px 0;
  color: var(--darkblue);
  overflow-x: auto;
  scrollbar-width: 0;

  &::-webkit-scrollbar {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .category-link {
    margin: 0 20px;
  }

  .icon {
    font-size: 30px;
    margin: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--darkblue);
    background-color: transparent;
    border: none;
  }

  a {
    color: var(--darkblue);
    text-decoration: none;
    font-size: 18px;
  }
`;

export default SubMenu;
