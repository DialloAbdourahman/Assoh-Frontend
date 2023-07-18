import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useProductsContext } from '../contexts/productsContext';
import { ADD_TO_CART } from '../utils/actions';

const ProductsList = ({
  state,
  categories,
  products,
  page,
  setPage,
  handleChange,
}) => {
  const { dispatch, cart } = useProductsContext();
  const { user } = useAuthContext();

  const addToCart = (product) => {
    const productExist = cart.find((item) => item.id === product.id);

    if (productExist) {
      alert('Product is added to the cart already.');
      return;
    }

    dispatch({ type: ADD_TO_CART, payload: product });
  };

  if (products.length === 0 && state?.category) {
    return (
      <Wrapper>
        {state?.category && (
          <h1 className='no-products'>
            No product matches the "
            {
              categories.find((category) => category.id === state?.category)
                ?.name
            }
            " Category
          </h1>
        )}
        <div className='pagination'>
          <Pagination
            count={11}
            defaultPage={page}
            siblingCount={0}
            onChange={handleChange}
            size='large'
          />
        </div>
      </Wrapper>
    );
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <h3 className='no-products'>No product matches your search</h3>
        <div className='pagination'>
          <Pagination
            count={11}
            defaultPage={page}
            siblingCount={0}
            onChange={handleChange}
            size='large'
          />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {state?.category && (
        <h1 className='title'>
          "
          {categories.find((category) => category.id === state?.category)?.name}
          " Category
        </h1>
      )}
      {state?.name && (
        <h1 className='title'>Result for the Search "{state?.name}"</h1>
      )}
      <div className='products-container'>
        {products.map((product) => {
          return (
            <article className='single-product' key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className='image-center'>
                  <img src={product?.imagesUrl[0]?.split(' ')[1]} alt='' />
                </div>
                <p className='name'>
                  <span className='bold'>Name: </span>
                  {product.name}
                </p>
                <p className='decription'>
                  <span className='bold'>Description: </span>
                  {product.description.substring(0, 70)}...
                </p>
                <p className='quantity'>
                  <span className='bold'>Quantity available: </span>
                  {product.quantity}
                </p>
                <p className='price'>
                  <span className='bold'>Price: </span>
                  <span className='orange'>{product.price} FCFA</span>
                </p>
              </Link>
              {(user?.role === 'customer' || !user?.email) && (
                <div className='btn-container'>
                  <button
                    disabled={product.quantity < 1 && true}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <div className='pagination'>
        <Pagination
          count={11}
          defaultPage={page}
          siblingCount={0}
          onChange={handleChange}
          size='large'
        />
      </div>
    </Wrapper>
  );
};

export default ProductsList;

const Wrapper = styled.section`
  width: 75%;
  min-height: 100%;

  a {
    text-decoration: none;
    color: black;
  }

  .title {
    text-align: center;
    margin: 20px 0;
    font-weight: normal;
    font-size: 25px;
  }

  .bold {
    font-weight: bold;
  }

  .orange {
    color: var(--orange);
  }

  img {
    width: 200px;
    height: 200px;
  }

  .products-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin: 10px 0;
  }

  .single-product {
    border-radius: 10px;
    background-color: white;
    padding: 10px 20px;
    border-radius: 3px;
    box-shadow: 0px 0px 3px var(--lightblack);
    transition: transform 0.2s linear;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .single-product:hover {
    transform: translateY(-2%);
  }

  .single-product p {
    margin: 10px 0;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;
  }

  .btn-container button {
    width: 100%;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }

  .image-center {
    display: flex;
    justify-content: center;
  }

  .no-products {
    text-align: center;
    margin-top: 40vh;
    font-size: 30px;
  }
`;
