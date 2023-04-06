import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ message, direction }) => {
  return (
    <Wrapper style={{ flexDirection: direction }}>
      <h1>An error has occured</h1>
      <h3
        style={{
          marginLeft: `${direction !== 'column' ? '20px' : '0'}`,
          color: 'var(--black)',
        }}
      >
        {message}
      </h3>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 20px 0;
    color: red;
  }
`;

export default ErrorMessage;
