import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SingleProductPayment = () => {
  const {
    state: { product },
  } = useLocation();

  return (
    <Wrapper>
      <h1>Item Summary</h1>
      <br />
      <div className='image'>
        <img
          src={
            product?.productImageUrls &&
            product?.productImageUrls[0]?.split(' ')[1]
          }
          alt=''
          className='main-image'
        />
      </div>
      <p>Name: {product?.name}</p>
      <p>
        price: {product?.price} * {product?.amount} ={' '}
        {product?.price * product?.amount} FCFA
      </p>
      <div className='payments'>
        <button>Pay with MoMo</button>
        <button>Pay with OM</button>
        <button>Pay with Paypal</button>
        <button>Pay with Credit Card</button>
        <button>Pay with Visa Card</button>
        <button>Pay with Master Card</button>
      </div>
    </Wrapper>
  );
};

export default SingleProductPayment;

const Wrapper = styled.section``;
