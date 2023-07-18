import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getStatistics = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(`/${user.role}/statistics`, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      });

      setStatistics(data);
    } catch (error) {
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <Wrapper>
      <h2>Admin statistics</h2>
      <div className='boxes'>
        <div className='box'>
          <p className='value'>{statistics?.sellers}</p>
          <p className='text'>Sellers</p>
        </div>
        <div className='box'>
          <p className='value'>{statistics?.customers}</p>
          <p className='text'>Customers</p>
        </div>
        <div className='box'>
          <p className='value'>{statistics?.products}</p>
          <p className='text'>Products</p>
        </div>
        <div className='box'>
          <p className='value'>{statistics?.sellerReports}</p>
          <p className='text'>Seller Reports</p>
        </div>
      </div>
      <img src='/images/stats.png' alt='' className='stats-img' />
    </Wrapper>
  );
};

export default AdminStatistics;

const Wrapper = styled.section`
  width: 80%;
  padding: 10px;

  .boxes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    width: 100%;
  }

  .box {
    border: 1px solid black;
    border-radius: 10px;
    max-width: 300px;
    width: 30%;
    text-align: center;
  }

  .stats-img {
    display: block;
    width: 100%;
    margin-top: 50px;
  }
`;
