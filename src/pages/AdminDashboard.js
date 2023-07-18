import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminDashboardLeft from '../components/AdminDashboardLeft';

const AdminDashboard = () => {
  return (
    <Wrapper>
      <AdminDashboardLeft />
      <Outlet />
    </Wrapper>
  );
};

export default AdminDashboard;

const Wrapper = styled.section`
  min-height: calc(100vh - (104px + 18px));
  display: flex;
`;
