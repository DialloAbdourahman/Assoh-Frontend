import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';

const Loading = () => {
  const { loading } = useGlobalContext();

  return (
    <Wrapper style={{ display: `${loading ? 'flex' : 'none'}` }}>
      <CircularProgress
        style={{
          color: 'var(--orange)',
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--transparentbackground);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
