import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../contexts/productsContext';
import { SmallLoading, OutsideAlerter } from '../components';
import { EMPTY_SEARCH_TERM } from '../utils/actions';

const SearchList = () => {
  const { searchedProducts, searchTerm, searchProductsLoading, dispatch } =
    useProductsContext();

  if (searchProductsLoading) {
    return (
      <Wrapper>
        <OutsideAlerter>
          <SmallLoading />
        </OutsideAlerter>
      </Wrapper>
    );
  }

  if (searchTerm && searchedProducts.length === 0) {
    return (
      <Wrapper>
        <OutsideAlerter>
          <p className='nothing'>No product matched your search</p>
        </OutsideAlerter>
      </Wrapper>
    );
  }

  if (!searchTerm) {
    return <></>;
  }

  return (
    <Wrapper>
      <OutsideAlerter>
        {searchedProducts.map((product) => {
          return (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={() => dispatch({ type: EMPTY_SEARCH_TERM })}
            >
              {product.name}
            </Link>
          );
        })}
      </OutsideAlerter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 74%;
  width: 100%;
  background-color: var(--lightgrey);
  padding: 5px 10px;
  border-radius: 3px;
  border: 1px solid black;
  z-index: 300;

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

  .nothing {
    padding: 5px 0;
    color: var(--black);
  }
`;

export default SearchList;
