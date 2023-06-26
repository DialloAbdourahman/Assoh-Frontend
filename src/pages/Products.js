import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_LINK } from '../utils/constants';
import { useProductsContext } from '../contexts/productsContext';
import { useGlobalContext } from '../contexts/globalContext';
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_PRODUCTS,
} from '../utils/actions';
import { Loading } from '../components/index';
import styled from 'styled-components';

const Products = () => {
  const { state } = useLocation();
  const [page, setPage] = useState(state.page);
  const {
    dispatch: dispatchGlobalContext,
    loading,
    categories,
  } = useGlobalContext();
  const { products, dispatch } = useProductsContext();

  const fetchProducts = async () => {
    try {
      dispatchGlobalContext({ type: SET_LOADING_TRUE });

      const { data } = await axios({
        method: 'get',
        url: `${API_LINK}/products?name=${state.name}&page=${page}&categoryId=${state.category}`,
      });

      dispatch({ type: SET_PRODUCTS, payload: data });
      dispatchGlobalContext({ type: SET_LOADING_FALSE });
    } catch (error) {
      dispatch({ type: SET_LOADING_FALSE, payload: false });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, state]);

  if (loading) {
    return <></>;
  }

  if (products.length === 0) {
    return (
      <>
        {state.category && (
          <h1>
            {categories.find((category) => category.id === state.category).name}{' '}
            category
          </h1>
        )}
        <h3>No product matches this category</h3>
      </>
    );
  }

  return (
    <Wrapper>
      {state.category && (
        <h1>
          {categories.find((category) => category.id === state.category).name}{' '}
          category
        </h1>
      )}
      <div className='products-container'>
        {products.map((product) => {
          return <h1 key={product.id}>{product.name}</h1>;
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Products;
