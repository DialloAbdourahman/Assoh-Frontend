import React, { useState } from 'react';
import styled from 'styled-components';
import ImagesDisplay from './ImagesDisplay';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';
import { useProductsContext } from '../contexts/productsContext';
import { ADD_TO_CART } from '../utils/actions';

const ProductInfo = ({ product, amount, setAmount }) => {
  const { cart, dispatch } = useProductsContext();
  const { user } = useAuthContext();

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
      <ImagesDisplay images={product?.imagesUrl} />
      <div className='info'>
        <p>
          <span className='bold'>Name:</span> {product?.name}
        </p>
        <p>
          <span className='bold'>Category:</span> {product?.category?.name}
        </p>
        <p>
          <span className='bold'>Description:</span> {product?.description}
        </p>
        <p>
          <span className='bold'>Stock:</span> {product?.quantity}
        </p>
        <Link to={`/sellerInfo/${product?.seller?.id}`} className='to-seller'>
          <span className='bold'>Seller:</span> Visite {product?.seller?.name}
        </Link>
        <p>
          <span className='bold'>Price:</span>{' '}
          <span className='orange'>{product?.price} FCFA</span>
        </p>
        <p>
          <span className='bold'>Shipping Countries:</span>{' '}
          {product?.seller?.shippingCountries?.map((country) => `${country}, `)}
        </p>
        <ul>
          <span className='bold'>Shipping regions and prices:</span>{' '}
          {product?.seller?.shippingRegionsAndPrices?.map((region, index) => {
            return (
              <li key={index} className='region'>
                {region?.name}: {region?.shippingPrice}FCFA
              </li>
            );
          })}
        </ul>

        {(user?.role === 'customer' || !user?.email) && (
          <>
            <div className='quantity'>
              <span className='bold'>Quantity:</span>{' '}
              <input
                type='number'
                name='amount'
                id='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={1}
                max={product?.quantity}
                className='quantity-input'
              />
            </div>
            <div className='list-buttons'>
              <button
                onClick={() => {
                  addToCart({ ...product, amount });
                }}
                className='hover'
              >
                Add to Cart
              </button>
              <button
                onClick={() => buyNow({ ...product, amount })}
                className='hover'
              >
                Buy Now
              </button>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductInfo;

const Wrapper = styled.section`
  margin-top: 20px;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;

  .info {
    width: 60%;
  }

  .info p {
    margin: 20px 0;
  }

  .info .quantity {
    margin: 20px 0;
  }

  .info .region {
    margin-top: 10px;
    margin-left: 50px;
  }

  .quantity-input {
    width: 100px;
    margin: 0 10px;
    padding: 3px;
    border-radius: 5px;
    outline: none;
  }

  .list-buttons button {
    margin-right: 20px;
  }

  button {
    width: 150px;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }

  .bold {
    font-weight: bold;
    color: black;
  }

  .to-seller {
    text-decoration: none;
  }

  .orange {
    color: var(--orange);
  }
`;
