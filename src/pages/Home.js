import React from 'react';
import styled from 'styled-components';
import { Carousel, Categories } from '../components/index';

const Home = () => {
  return (
    <Wrapper>
      <Carousel />
      <Categories />
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Home;
