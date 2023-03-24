import React from 'react';
import styled from '@emotion/styled';

const MobileSearch = ({ setShowMobileSearch }) => {
  return (
    <Wrapper>
      This is the search form for mobile applications
      <button onClick={() => setShowMobileSearch(false)}>close form</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: red;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: none;

  @media (max-width: 500px) {
    display: block;
  }
`;

export default MobileSearch;
