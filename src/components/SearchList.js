import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../contexts/productsContext';
import { SmallLoading, OutsideAlerterSearchForm } from '../components';
import { EMPTY_SEARCH_TERM } from '../utils/actions';

const SearchList = ({ setShowMobileSearch }) => {
  const { searchedProducts, searchTerm, searchProductsLoading, dispatch } =
    useProductsContext();

  if (searchProductsLoading && searchTerm !== '') {
    return (
      <Wrapper>
        <OutsideAlerterSearchForm>
          <SmallLoading />
        </OutsideAlerterSearchForm>
      </Wrapper>
    );
  }

  if (searchTerm && searchedProducts.length === 0) {
    return (
      <Wrapper>
        <OutsideAlerterSearchForm>
          <p className='nothing'>No product matched your search</p>
        </OutsideAlerterSearchForm>
      </Wrapper>
    );
  }

  if (!searchTerm) {
    return <></>;
  }

  return (
    <Wrapper id='item'>
      <OutsideAlerterSearchForm>
        {searchedProducts.map((product) => {
          return (
            <>
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                onClick={() => dispatch({ type: EMPTY_SEARCH_TERM })}
                className='desktopSearch'
                id='item'
              >
                {product.name}
              </Link>
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                onClick={() => {
                  dispatch({ type: EMPTY_SEARCH_TERM });
                  setShowMobileSearch(false);
                }}
                className='mobileSearch'
                id='item'
              >
                {product.name}
              </Link>
            </>
          );
        })}
      </OutsideAlerterSearchForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 85%;
  width: 100%;
  background-color: white;
  padding: 5px 10px;
  border-radius: 3px;
  z-index: 300;
  box-shadow: 0px 0px 3px var(--lightblack);

  a {
    display: block;
    margin: 10px 0;
    padding: 5px 20px;
    color: var(--darkblue);
    font-weight: normal;
    transition: transform 0.3s linear;
  }

  a:hover {
    transform: translateX(2%);
  }

  .nothing {
    padding: 5px 0;
    color: var(--black);
  }

  .desktopSearch {
    display: block;
  }

  .mobileSearch {
    display: none;
  }

  @media (max-width: 500px) {
    .desktopSearch {
      display: none;
    }

    .mobileSearch {
      display: block;
    }
  }
`;

export default SearchList;
