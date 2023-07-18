import React, { useState } from 'react';
import styled from 'styled-components';
import { Rating } from '@mui/material';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';
import UpdateReview from './UpdateReview';
import DeleteReview from './DeleteReview';

const ProductReviews = ({ product, setProduct }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();
  const [updateReview, setUpdateReview] = useState({
    show: false,
    review: {},
  });
  const [deleteReview, setDeleteReview] = useState({
    show: false,
    review: {},
  });

  const addReview = async (e) => {
    e.preventDefault();

    if (rating === 0 || comment === '') {
      alert(
        'Please, enter rating and comment before you can review a product.'
      );
      return;
    }

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

  return (
    <Wrapper>
      <h2 className='title'>Customer Reviews ({product?.reviews?.length})</h2>
      <div className='reviews-list'>
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
              </div>
              <div className='optional-buttons'>
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
                  <button
                    onClick={() =>
                      setDeleteReview({
                        show: true,
                        review,
                      })
                    }
                  >
                    delete
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {user?.role === 'customer' && (
        <form onSubmit={addReview} className='form-review'>
          <h2>Leave a Review</h2>
          <div className='field'>
            <label htmlFor='rating'>Rating: </label>
            <Rating
              name='size-large'
              value={rating}
              size='large'
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <div className='field'>
            <textarea
              name='comment'
              id='comment'
              cols='50'
              rows='10'
              placeholder='Leave a review'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button type='sumbit' className='review-button'>
            Send
          </button>
        </form>
      )}
      {updateReview.show && (
        <UpdateReview
          updateReview={updateReview}
          setUpdateReview={setUpdateReview}
          setProduct={setProduct}
          product={product}
        />
      )}
      {deleteReview.show && (
        <DeleteReview
          deleteReview={deleteReview}
          setDeleteReview={setDeleteReview}
          setProduct={setProduct}
          product={product}
        />
      )}
    </Wrapper>
  );
};

export default ProductReviews;

const Wrapper = styled.section`
  margin-bottom: 20px;

  .title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
  }

  .form-review h2 {
    margin-bottom: 20px;
  }

  .review-button {
    width: 150px;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }

  .field {
    margin-bottom: 10px;
  }

  label {
    font-size: 20px;
  }

  .reviews-list {
    margin-bottom: 30px;
  }

  .review {
    display: flex;
    align-items: flex-start;
  }

  .avatar {
    background-color: var(--orange);
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 50%;
    font-size: 20px;
    margin-right: 20px;
  }

  /* .optional-buttons {
    align-self: center;
  } */

  .optional-buttons button {
    width: 100px;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    margin: 0 30px;
  }

  textarea {
    padding: 10px;
    font-size: 16px;
  }
`;
