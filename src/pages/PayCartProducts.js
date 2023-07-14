import React from 'react';
import styled from 'styled-components';
import { useProductsContext } from '../contexts/productsContext';

const PayCartProducts = () => {
  const { cart, cartTotalPrice } = useProductsContext();

  if (cart?.length === 0) {
    return <h1>Cart is empty</h1>;
  }

  return (
    <Wrapper>
      <h1>Item Summary</h1>
      {cart?.map((product) => {
        return (
          <article key={product.id}>
            <br />
            <div className='image'>
              <img
                src={product?.imagesUrl && product?.imagesUrl[0]?.split(' ')[1]}
                alt=''
                className='main-image'
              />
            </div>
            <p>Name: {product?.name}</p>
            <p>
              price: {product?.price} * {product?.amount} ={' '}
              {product?.price * product?.amount} FCFA
            </p>
            <br />
          </article>
        );
      })}
      <h2>Total price: {cartTotalPrice} FCFA</h2>
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

export default PayCartProducts;

const Wrapper = styled.section``;
