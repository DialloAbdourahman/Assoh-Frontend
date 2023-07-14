import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../contexts/productsContext';
import {
  DECREASE_CART_PRODUCT_AMOUNT,
  EMPTY_CART,
  INCREASE_CART_PRODUCT_AMOUNT,
  REMOVE_PRODUCT_FROM_CART,
} from '../utils/actions';

const Cart = () => {
  const { cart, cartTotalPrice, dispatch } = useProductsContext();

  return (
    <Wrapper>
      <h1>Cart</h1>
      {cart?.length === 0 && <h2>No product in cart.</h2>}
      {cart?.map((cartItem) => {
        return (
          <article key={cartItem?.id} className='cart-item'>
            <div className='image'>
              <img
                src={
                  cartItem?.imagesUrl && cartItem?.imagesUrl[0]?.split(' ')[1]
                }
                alt=''
                className='main-image'
              />
            </div>
            <p>Name: {cartItem?.name}</p>
            <p>Price: {cartItem?.price} FCFA</p>
            <p>Amount: {cartItem?.amount}</p>
            <button
              onClick={() => {
                dispatch({
                  type: REMOVE_PRODUCT_FROM_CART,
                  payload: cartItem?.id,
                });
              }}
            >
              remove
            </button>

            <button
              onClick={() => {
                dispatch({
                  type: INCREASE_CART_PRODUCT_AMOUNT,
                  payload: cartItem,
                });
              }}
            >
              increase
            </button>
            <button
              onClick={() => {
                dispatch({
                  type: DECREASE_CART_PRODUCT_AMOUNT,
                  payload: cartItem,
                });
              }}
            >
              decrease
            </button>
          </article>
        );
      })}
      {cart?.length > 0 && (
        <button onClick={() => dispatch({ type: EMPTY_CART })}>
          empty cart
        </button>
      )}
      {cart?.length > 0 && (
        <Link to={'/payCartProducts'}>Proceed to Checkout</Link>
      )}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.section``;
