import React from 'react';
import styled from 'styled-components';
import { useProductsContext } from '../contexts/productsContext';

const PayCartProducts = () => {
  const { cart, cartTotalPrice } = useProductsContext();

  if (cart?.length === 0) {
    return <h2>Cart is empty</h2>;
  }

  return (
    <Wrapper className='container'>
      <div className='inside'>
        <h2>Item Summary</h2>
        {cart?.map((product) => {
          return (
            <article key={product.id} className='item'>
              <div className='image'>
                <img
                  src={
                    product?.imagesUrl && product?.imagesUrl[0]?.split(' ')[1]
                  }
                  alt=''
                  className='main-image'
                />
              </div>
              <div className='info'>
                <p>Name: {product?.name}</p>
                <p>
                  price: {product?.price} * {product?.amount} ={' '}
                  {product?.price * product?.amount} FCFA
                </p>
              </div>
              <br />
            </article>
          );
        })}
        <h2>
          Total price: <span className='orange'>{cartTotalPrice} FCFA</span>
        </h2>
        <div className='payments'>
          <button>Pay with MoMo</button>
          <button>Pay with OM</button>
          <button>Pay with Paypal</button>
          <button>Pay with Credit Card</button>
          <button>Pay with Visa Card</button>
          <button>Pay with Master Card</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default PayCartProducts;

const Wrapper = styled.section`
  text-align: center;

  h2 {
    margin-top: 20px;
  }

  .payments {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 30px 0;
  }

  button {
    width: 200px;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;
    box-shadow: 0px 0px 3px var(--lightblack);
    width: 40%;
    margin: 20px auto;
  }

  .item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }

  .orange {
    color: var(--orange);
  }
`;
