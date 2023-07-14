import React, { useState } from 'react';
import { Rating } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import { axiosInstance } from '../axios/instance';

const UpdateReview = ({
  updateReview,
  setUpdateReview,
  product,
  setProduct,
}) => {
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();
  const [rating, setRating] = useState(updateReview.review.rating);
  const [comment, setComment] = useState(updateReview.review.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.patch(
        `/${user?.role}/updateProductReview/${updateReview.review.id}`,
        { rating, comment },
        {
          headers: {
            Authorization: 'Bearer ' + user?.accessToken,
          },
        }
      );
      console.log(data);

      setProduct((oldProduct) => {
        let newReviews = oldProduct.reviews.filter(
          (review) => review.id !== data.review.id
        );
        newReviews.push(data.review);

        return { ...oldProduct, reviews: newReviews };
      });
      setComment('');
      setRating(0);

      setUpdateReview({ show: false, review: [] });

      alert(data.message);
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      } else {
        alert('Something went wrong');
      }
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Rating:{' '}
        <Rating
          name='size-large'
          value={rating}
          size='large'
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>
      <div>
        Comment{' '}
        <textarea
          name='comment'
          id='comment'
          cols='30'
          rows='10'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button onClick={() => setUpdateReview({ show: false, review: {} })}>
        close
      </button>
      <button type='submit'>submit</button>
    </form>
  );
};

export default UpdateReview;
