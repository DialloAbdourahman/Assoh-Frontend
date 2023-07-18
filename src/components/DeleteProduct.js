import React from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../axios/instance';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const DeleteProduct = ({ deleteProduct, setDeleteProduct, fetchProducts }) => {
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.delete(
        `/${user?.role}/deleteProduct/${deleteProduct?.product?.id}`,

        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      fetchProducts();
      setDeleteProduct({ show: false, product: {} });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper>
      <h2>
        Are you sure you want to delete "{deleteProduct?.product?.name}" ?
      </h2>
      <button onClick={handleDeleteProduct}>Yes</button>
      <button onClick={() => setDeleteProduct({ show: false, product: {} })}>
        No
      </button>
    </Wrapper>
  );
};

export default DeleteProduct;

const Wrapper = styled.section``;
