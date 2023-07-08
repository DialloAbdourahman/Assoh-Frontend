import React from 'react';
import styled from '@emotion/styled';
import SearchList from './SearchList';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useProductsContext } from '../contexts/productsContext';
import { SET_SEARCH_TERM, EMPTY_SEARCH_TERM } from '../utils/actions';

const MobileSearch = ({ setShowMobileSearch }) => {
  const { searchTerm, dispatch: dispatchProductContext } = useProductsContext();

  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate('/products', {
      state: { name: searchTerm, page: 1, category: '' },
    });

    dispatchProductContext({ type: EMPTY_SEARCH_TERM });
    setShowMobileSearch(false);
  };

  return (
    <Wrapper>
      <div className='flex'>
        <form
          method='post'
          className='search-form'
          onSubmit={handleSearchSubmit}
        >
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search for a product'
            autoComplete='off'
            value={searchTerm}
            onChange={(e) =>
              dispatchProductContext({
                type: SET_SEARCH_TERM,
                payload: e.target.value,
              })
            }
          />
          <button type='submit' className='search-icon'>
            <AiOutlineSearch />
          </button>
          <SearchList setShowMobileSearch={setShowMobileSearch} />
        </form>
        <button onClick={() => setShowMobileSearch(false)}>close form</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: red;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: none;
  padding: 20px;

  .search-form {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
    flex-grow: 1;
    margin-right: 10px;
  }

  .search-form input {
    padding: 7px 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  .search-icon {
    position: absolute;
    right: 10px;
    top: 23px;
    background-color: transparent;
    border: none;
    color: var(--darkblue);
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 500px) {
    display: block;
  }
`;

export default MobileSearch;
