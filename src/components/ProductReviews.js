import React, { useState } from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import UpdateReview from './UpdateReview';

const ProductReviews = ({ product, setProduct }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();
  const [updateReview, setUpdateReview] = useState({
    show: false,
    review: {},
  });
  // console.log(product);

  const addReview = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.post(
        `/${user?.role}/reviewProduct`,
        { productId: product.id, rating, comment },
        {
          headers: {
            Authorization: 'Bearer ' + user?.accessToken,
          },
        }
      );

      console.log(data);

      setProduct({
        ...product,
        reviews: [data.productReview, ...product.reviews],
      });
      setComment('');
      setRating(0);

      alert(data.message);
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      } else {
        alert('Something went wrong');
      }
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const deleteReview = async (id) => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.delete(
        `/${user?.role}/deleteProductReview/${id}`,
        {
          headers: {
            Authorization: 'Bearer ' + user?.accessToken,
          },
        }
      );

      setProduct({
        ...product,
        reviews: product.reviews.filter((review) => review.id !== id),
      });

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
    <Wrapper>
      <h1>Customer Reviews ({product?.reviews?.length})</h1>
      {user?.role === 'customer' && (
        <form onSubmit={addReview}>
          <h1>Leave review</h1>
          <Rating
            name='size-large'
            value={rating}
            size='large'
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <textarea
            name='comment'
            id='comment'
            cols='30'
            rows='10'
            placeholder='Leave a review'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type='sumbit'>Send</button>
        </form>
      )}
      {product?.reviews?.map((review) => {
        return (
          <article key={review?.id} className='review'>
            <p className='avatar'>
              {review?.customer?.name?.substring(0, 2).toUpperCase()}
            </p>
            <div className='right'>
              <p className='rating'>
                <Rating
                  name='read-only'
                  value={review?.rating}
                  size='medium'
                  readOnly
                />
              </p>
              <p className='comment'>{review?.comment}</p>
              {review?.customer?.id === user?.id && (
                <button
                  onClick={() => {
                    setUpdateReview({
                      show: true,
                      review,
                    });
                  }}
                >
                  update
                </button>
              )}
              {review?.customer?.id === user?.id && (
                <button onClick={() => deleteReview(review.id)}>delete</button>
              )}
            </div>
          </article>
        );
      })}
      {updateReview.show && (
        <UpdateReview
          updateReview={updateReview}
          setUpdateReview={setUpdateReview}
          product={product}
          setProduct={setProduct}
        />
      )}
    </Wrapper>
  );
};

export default ProductReviews;

const Wrapper = styled.section``;
