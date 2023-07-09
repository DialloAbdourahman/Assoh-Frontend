import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const SingleProductPayment = () => {
  const { state } = useLocation();
  const [amount, setAmount] = useState(state?.amount);
  const [totalPrice, setTotalPrice] = useState(state?.amount * state?.price);

  return (
    <div>
      <p>Name: {state?.name}</p>
      <p>Amount: {amount}</p>
      <p>Total Price: {totalPrice} FCFA</p>
    </div>
  );
};

export default SingleProductPayment;
