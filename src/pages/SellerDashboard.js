import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SellerDashboardLeft from '../components/SellerDashboardLeft';

const SellerDashboard = () => {
  return (
    <Wrapper>
      <SellerDashboardLeft />
      <Outlet />
    </Wrapper>
  );
};

export default SellerDashboard;

const Wrapper = styled.section`
  min-height: calc(100vh - (104px + 18px));
  display: flex;
`;
