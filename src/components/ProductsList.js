import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProductsList = ({ state, categories, products }) => {
  if (products.length === 0) {
    return (
      <Wrapper>
        <h3 className='no-products'>No product matches your search</h3>
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
        {products.map(
          ({ id, name, imagesUrl, price, quantity, description }) => {
            return (
              <article className='single-product' key={id}>
                <Link to={'/'}>
                  <div className='image-center'>
                    <img src={imagesUrl[0]?.split(' ')[1]} alt='' />
                  </div>
                  <p className='name'>
                    <span className='bold'>Name: </span>
                    {name}
                  </p>
                  <p className='decription'>
                    <span className='bold'>Description: </span>
                    {description.substring(0, 70)}...
                  </p>
                  <p className='quantity'>
                    <span className='bold'>Quantity available: </span>
                    {quantity}
                  </p>
                  <p className='price'>
                    <span className='bold'>Price: </span>
                    <span className='orange'>{price} FCFA</span>
                  </p>
                </Link>
                <div className='btn-container'>
                  <button disabled={quantity < 1 && true}>Add to Cart</button>
                  <button disabled={quantity < 1 && true}>Order Now</button>
                </div>
              </article>
            );
          }
        )}
        {products.map(
          ({ id, name, imagesUrl, price, quantity, description }) => {
            return (
              <article className='single-product' key={id}>
                <Link to={'/'}>
                  <div className='image-center'>
                    <img src={imagesUrl[0]?.split(' ')[1]} alt='' />
                  </div>
                  <p className='name'>
                    <span className='bold'>Name: </span>
                    {name}
                  </p>
                  <p className='decription'>
                    <span className='bold'>Description: </span>
                    {description.substring(0, 70)}...
                  </p>
                  <p className='quantity'>
                    <span className='bold'>Quantity available: </span>
                    {quantity}
                  </p>
                  <p className='price'>
                    <span className='bold'>Price: </span>
                    <span className='orange'>{price} FCFA</span>
                  </p>
                </Link>
                <div className='btn-container'>
                  <button disabled={quantity < 1 && true}>Add to Cart</button>
                  <button disabled={quantity < 1 && true}>Order Now</button>
                </div>
              </article>
            );
          }
        )}
        {products.map(
          ({ id, name, imagesUrl, price, quantity, description }) => {
            return (
              <article className='single-product' key={id}>
                <Link to={'/'}>
                  <div className='image-center'>
                    <img src={imagesUrl[0]?.split(' ')[1]} alt='' />
                  </div>
                  <p className='name'>
                    <span className='bold'>Name: </span>
                    {name}
                  </p>
                  <p className='decription'>
                    <span className='bold'>Description: </span>
                    {description.substring(0, 70)}...
                  </p>
                  <p className='quantity'>
                    <span className='bold'>Quantity available: </span>
                    {quantity}
                  </p>
                  <p className='price'>
                    <span className='bold'>Price: </span>
                    <span className='orange'>{price} FCFA</span>
                  </p>
                </Link>
                <div className='btn-container'>
                  <button disabled={quantity < 1 && true}>Add to Cart</button>
                  <button disabled={quantity < 1 && true}>Order Now</button>
                </div>
              </article>
            );
          }
        )}
      </div>
    </Wrapper>
  );
};

export default ProductsList;

const Wrapper = styled.section`
  width: 80%;
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
    width: 40%;
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