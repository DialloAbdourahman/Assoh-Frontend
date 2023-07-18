import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import AdminDeleteSeller from './AdminDeleteSeller';
import AdminCreateSeller from './AdminCreateSeller';

const AdminSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [deleteSeller, setDeleteSeller] = useState({
    show: false,
    seller: {},
  });
  const [createSeller, setCreateSeller] = useState(false);

  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const fetchSellers = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.get(
        `/${user?.role}/sellers?name=${name}&page=${page}`,
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      setSellers(data);
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
    fetchSellers();
  }, [name, page]);

  return (
    <Wrapper>
      <header className='dashboard-header'>
        <h2>All Sellers</h2>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Search for a seller'
        />
        <button onClick={() => setCreateSeller(true)}>Add a seller</button>
      </header>
      {sellers?.length === 0 && <h2>No Sellers available. </h2>}
      {sellers.length > 0 && (
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Seller ID</th>
              <th>Seler Name</th>
              <th>Seller Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers?.map((seller) => {
              return (
                <tr key={seller?.id}>
                  <td>{seller?.id}</td>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        setDeleteSeller({
                          show: true,
                          seller,
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
      {deleteSeller.show && (
        <AdminDeleteSeller
          deleteSeller={deleteSeller}
          setDeleteSeller={setDeleteSeller}
          fetchSellers={fetchSellers}
        />
      )}
      {createSeller && (
        <AdminCreateSeller
          setCreateSeller={setCreateSeller}
          fetchSellers={fetchSellers}
        />
      )}
    </Wrapper>
  );
};

export default AdminSellers;

const Wrapper = styled.section`
  padding: 10px;
  width: 80%;
`;
