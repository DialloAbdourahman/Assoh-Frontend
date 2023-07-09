import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../axios/instance';
import { useProductsContext } from '../contexts/productsContext';
import { useGlobalContext } from '../contexts/globalContext';
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_PRODUCTS,
} from '../utils/actions';
import styled from 'styled-components';
import ProductsFilters from '../components/ProductsFilters';
import ProductsList from '../components/ProductsList';

const Products = () => {
  const { state } = useLocation();
  const [page, setPage] = useState(state.page);
  const {
    dispatch: dispatchGlobalContext,
    loading,
    categories,
  } = useGlobalContext();
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState([0, 1000000]);
  const [validateFilters, setValidateFilters] = useState(false);
  const [nameSort, setNameSort] = useState('asc');
  const { products, dispatch } = useProductsContext();

  const resetFilters = () => {
    setRating(0);
    setPrice([0, 1000000]);
    setNameSort('asc');
    setValidateFilters(!validateFilters);
  };

  const fetchProducts = async () => {
    try {
      dispatchGlobalContext({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(
        `/products?name=${state?.name}&page=${page}&categoryId=${state?.category}&nameSort=${nameSort}&minPrice=${price[0]}&maxPrice=${price[1]}&rating=${rating}`
      );

      dispatch({ type: SET_PRODUCTS, payload: data });
      dispatchGlobalContext({ type: SET_LOADING_FALSE });
    } catch (error) {
      dispatchGlobalContext({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, state, validateFilters]);

  if (loading) {
    return <></>;
  }

  return (
    <Wrapper className='container'>
      <div className='align'>
        <ProductsFilters
          rating={rating}
          setRating={setRating}
          price={price}
          setPrice={setPrice}
          nameSort={nameSort}
          setNameSort={setNameSort}
          validateFilters={validateFilters}
          setValidateFilters={setValidateFilters}
          resetFilters={resetFilters}
        />
        <ProductsList
          state={state}
          categories={categories}
          products={products}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .align {
    display: flex;
    justify-content: space-between;
    min-height: 100%;
  }
`;

export default Products;
