import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section>
      <h1>Page does not exist </h1>
      <Link to={'/'}>click to go back</Link>
    </section>
  );
};

export default Error;
