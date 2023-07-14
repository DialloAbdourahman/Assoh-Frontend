import React, { useState } from 'react';
import styled from 'styled-components';
import ImagesDisplay from './ImagesDisplay';
import { Link, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../contexts/productsContext';
import { ADD_TO_CART } from '../utils/actions';

const ProductInfo = ({ product, amount, setAmount }) => {
  const { cart, dispatch } = useProductsContext();
  const navigate = useNavigate();

  const addToCart = (product) => {
    const productExist = cart.find((item) => item.id === product.id);

    if (product?.quantity < amount) {
      alert('Sorry, not enough products');
      return;
    }

    if (productExist) {
      alert('Product is added to the cart already.');
      return;
    }

    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const buyNow = (product) => {
    if (product?.quantity < amount) {
      alert('Sorry, not enough products');
      return;
    }

    navigate('/singleProductPayment', { state: { product } });
  };

  return (
    <Wrapper>
      <ImagesDisplay images={product?.productImageUrls} />
      <div className='info'>
        <p>Name: {product?.name}</p>
        <p>Category: {product?.category?.name}</p>
        <p>Description: {product?.description}</p>
        <p>Stock : {product?.quantity}</p>
        <Link to={`/sellerInfo/${product?.seller?.id}`}>
          Seller: {product?.seller?.name}
        </Link>
        <p>Price: {product?.price} FCFA</p>
        <p>
          Shipping Countries:{' '}
          {product?.seller?.shippingCountries.map(
            (country, index) => `${country}, `
          )}
        </p>
        <div className='quantity'>
          Quantity:{' '}
          <input
            type='number'
            name='amount'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={1}
            max={product?.quantity}
          />
        </div>
        <ul>
          Shipping regions and prices:{' '}
          {product?.seller?.shippingRegionsAndPrices.map((region, index) => {
            return (
              <li key={index}>
                {region?.name}: {region?.shippingPrice}FCFA
              </li>
            );
          })}
        </ul>

        <div className='list-buttons'>
          <button
            onClick={() => {
              addToCart({ ...product, amount });
            }}
          >
            Add to Cart
          </button>
          <button onClick={() => buyNow({ ...product, amount })}>
            Buy Now
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductInfo;

const Wrapper = styled.section`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .info {
    width: 60%;
  }

  .info p {
    margin: 20px 0;
  }
`;
