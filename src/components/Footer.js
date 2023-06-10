import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return <Wrapper>Copyright Assoh all rights reserved.</Wrapper>;
};

export default Footer;

const Wrapper = styled.footer`
  background-color: var(--darkblue);
  text-align: center;
  padding: 20px 0;
  color: var(--lightgrey);
`;
