import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
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
    <Wrapper className='container'>
      <h2 className='title'>Cart Page</h2>
      {cart?.length === 0 && (
        <h2 className='no-product'>No product in cart.</h2>
      )}
      <div className='cart-items-container'>
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
              <div className='descriptions'>
                <p>Name: {cartItem?.name}</p>
                <p>Price: {cartItem?.price} FCFA</p>
                <button
                  onClick={() => {
                    dispatch({
                      type: REMOVE_PRODUCT_FROM_CART,
                      payload: cartItem?.id,
                    });
                  }}
                  className='remove hover'
                >
                  remove
                </button>
              </div>
              <div className='buttons'>
                <button
                  onClick={() => {
                    dispatch({
                      type: INCREASE_CART_PRODUCT_AMOUNT,
                      payload: cartItem,
                    });
                  }}
                  className='arrow'
                >
                  <AiOutlineArrowUp />
                </button>
                <p className='amount'>{cartItem?.amount}</p>
                <button
                  onClick={() => {
                    dispatch({
                      type: DECREASE_CART_PRODUCT_AMOUNT,
                      payload: cartItem,
                    });
                  }}
                  className='arrow'
                >
                  <AiOutlineArrowDown />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className='further'>
        {cart?.length > 0 && (
          <p className='total'>
            Total price: <span className='orange'>{cartTotalPrice} FCFA</span>
          </p>
        )}
        {cart?.length > 0 && (
          <Link to={'/payCartProducts'} className='checkout remove'>
            Proceed to Payment
          </Link>
        )}
        {cart?.length > 0 && (
          <button
            onClick={() => dispatch({ type: EMPTY_CART })}
            className='remove empty'
          >
            Empty cart <BsFillTrashFill className='trash' />
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.section`
  .title,
  .no-product {
    text-align: center;
    margin: 30px 0;
  }

  .title {
    font-size: 30px;
  }

  .cart-items-container {
    width: 60%;
    margin: auto;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0px 0px 3px var(--lightblack);
  }

  .cart-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .descriptions p {
    margin-bottom: 18px;
    text-align: center;
  }

  .remove {
    width: 100%;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .amount {
    text-align: center;
    margin: 10px 0;
    font-size: 18px;
  }

  .arrow {
    background-color: transparent;
    border: none;
    font-size: 18px;
  }

  .trash {
    margin-left: 10px;
  }

  .further {
    text-align: center;
    width: 30%;
    margin: 100px auto;
  }

  .total {
    margin: 20px 0;
  }

  .orange {
    color: var(--orange);
    font-size: 18px;
  }

  .checkout {
    text-decoration: none;
    margin-bottom: 20px;
  }

  .empty {
    background-color: var(--orange);
  }
`;
