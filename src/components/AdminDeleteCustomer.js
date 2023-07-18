import React from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../axios/instance';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const AdminDeleteCustomer = ({
  deleteCustomer,
  setDeleteCustomer,
  fetchCustomers,
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleDeleteCustomer = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.delete(
        `/${user?.role}/deleteCustomer/${deleteCustomer?.customer?.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      fetchCustomers();
      setDeleteCustomer({ show: false, customer: {} });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h2>
          Are you sure you want to delete customer "
          {deleteCustomer?.customer?.name}" ?
        </h2>
        <div className='list-buttons'>
          {' '}
          <button
            onClick={() => setDeleteCustomer({ show: false, customer: {} })}
          >
            No
          </button>
          <button onClick={handleDeleteCustomer}>Yes</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminDeleteCustomer;

const Wrapper = styled.section`
  text-align: center;
  .list-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;
