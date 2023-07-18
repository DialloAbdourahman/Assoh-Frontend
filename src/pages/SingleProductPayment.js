import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SingleProductPayment = () => {
  const {
    state: { product },
  } = useLocation();

  return (
    <Wrapper className='container'>
      <h2 className='title'>Item Summary</h2>
      <div className='image'>
        <img
          src={product?.imagesUrl && product?.imagesUrl[0]?.split(' ')[1]}
          alt=''
          className='main-image'
        />
      </div>
      <p>
        <span className='bold'>Name:</span> {product?.name}
      </p>
      <p>
        <span className='bold'>price:</span> {product?.price} *{' '}
        {product?.amount} ={' '}
        <span className='orange'>{product?.price * product?.amount} FCFA</span>
      </p>
      <h2 className='title'>Payment Methods Available</h2>
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

const Wrapper = styled.section`
  text-align: center;

  h2 {
    margin-top: 20px;
  }

  p {
    margin: 10px 0;
  }

  .bold {
    font-weight: bolder;
  }

  .orange {
    color: var(--orange);
  }

  .payments {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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

  .title {
    margin-bottom: 20px;
  }
`;
