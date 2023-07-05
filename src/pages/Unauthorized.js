import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section>
      <h1> You are not allow to rich this page </h1>
      <button onClick={() => navigate(-1)}>click to go back</button>
    </section>
  );
};

export default Unauthorized;
