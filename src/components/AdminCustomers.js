import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import AdminDeleteCustomer from './AdminDeleteCustomer';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [deleteCustomer, setDeleteCustomer] = useState({
    show: false,
    customer: {},
  });

  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const fetchCustomers = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(
        `/${user?.role}/customers?name=${name}&page=${page}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      setCustomers(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchCustomers();
  }, [name, page]);

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h2>All Customers</h2>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a customer'
        />
      </header>
      {customers?.length === 0 && <h2>No customers available. </h2>}
      {customers.length > 0 && (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => {
              return (
                <tr key={customer?.id}>
                  <td>{customer?.id}</td>
                  <td>{customer?.name}</td>
                  <td>{customer?.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        setDeleteCustomer({
                          show: true,
                          customer,
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className='pagination'>
        <Pagination
          count={11}
          defaultPage={page}
          siblingCount={0}
          onChange={handleChange}
        />
      </div>
      {deleteCustomer.show && (
        <AdminDeleteCustomer
          deleteCustomer={deleteCustomer}
          setDeleteCustomer={setDeleteCustomer}
          fetchCustomers={fetchCustomers}
        />
      )}
    </Wrapper>
  );
};

export default AdminCustomers;

const Wrapper = styled.section`
  width: 80%;
  padding: 10px;
`;
