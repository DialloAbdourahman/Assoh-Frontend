import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import styled from 'styled-components';
import ProductInfo from '../components/ProductInfo';
import ProductReviews from '../components/ProductReviews';

const SingleProduct = () => {
  const { id } = useParams();
  const { dispatch } = useGlobalContext();
  const [product, setProduct] = useState({});
  const [amount, setAmount] = useState(1);

  const fetchProduct = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.get(`/products/${id}`);
      setProduct({ ...data, amount });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Wrapper className='container'>
      <ProductInfo product={product} setAmount={setAmount} amount={amount} />
      <ProductReviews product={product} setProduct={setProduct} />
    </Wrapper>
  );
};

export default SingleProduct;

const Wrapper = styled.section``;
