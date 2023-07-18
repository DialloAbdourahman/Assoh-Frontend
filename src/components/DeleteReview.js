import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import { axiosInstance } from '../axios/instance';

const DeleteReview = ({
  deleteReview,
  setDeleteReview,
  setProduct,
  product,
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();
  const { id } = deleteReview.review;

  const handleDeleteReview = async (id) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.delete(
        `/${user?.role}/deleteProductReview/${deleteReview?.review?.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user?.accessToken,
          },
        }
      );

      setProduct({
        ...product,
        reviews: product.reviews.filter(
          (review) => review.id !== deleteReview?.review?.id
        ),
      });
      setDeleteReview({ show: false, review: {} });
      alert(data.message);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      } else {
        alert('Something went wrong');
      }
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };
  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h2>Are you sure you want to delete this review?</h2>
        <button onClick={handleDeleteReview}>delete</button>
        <button onClick={() => setDeleteReview({ show: false, review: {} })}>
          {' '}
          close
        </button>
      </div>
    </Wrapper>
  );
};

export default DeleteReview;

const Wrapper = styled.section``;
