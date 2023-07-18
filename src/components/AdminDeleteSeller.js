import React from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../axios/instance';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const AdminDeleteSeller = ({ deleteSeller, setDeleteSeller, fetchSellers }) => {
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleDeleteSeller = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.delete(
        `/${user?.role}/deleteSeller/${deleteSeller?.seller?.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      fetchSellers();
      setDeleteSeller({ show: false, seller: {} });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper>
      <h2>
        Are you sure you want to delete seller "{deleteSeller?.seller?.name}" ?
      </h2>
      <button onClick={handleDeleteSeller}>Yes</button>
      <button onClick={() => setDeleteSeller({ show: false, seller: {} })}>
        No
      </button>
    </Wrapper>
  );
};

export default AdminDeleteSeller;

const Wrapper = styled.section``;
