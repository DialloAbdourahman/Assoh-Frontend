import React, { useState } from 'react';
import styled from 'styled-components';
import { axiosInstance } from '../axios/instance';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const UpdateProduct = ({ editProduct, setEditProduct, fetchProducts }) => {
  const [name, setName] = useState(editProduct?.product?.name);
  const [categoryId, setCategoryId] = useState(
    editProduct?.product?.category?.id
  );
  const [description, setDescription] = useState(
    editProduct?.product?.description
  );
  const [quantity, setQuantity] = useState(editProduct?.product?.quantity);
  const [price, setPrice] = useState(editProduct?.product?.price);

  const { categories, dispatch } = useGlobalContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.patch(
        `/${user?.role}/updateProduct/${editProduct?.product?.id}`,
        {
          name,
          categoryId,
          description,
          quantity: parseInt(quantity),
          price: parseInt(price),
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      fetchProducts();
      setEditProduct({ show: false, product: {} });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h2>Update product information</h2>
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='category'>Category: </label>
            <select
              type='text'
              name='category'
              // value={editProduct?.product?.category?.id}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value={categoryId}>
                {editProduct?.product?.category?.name}
              </option>
              {categories?.map((category) => {
                if (category?.id === categoryId) {
                  return;
                }
                return (
                  <option
                    key={category?.id}
                    value={category?.id}
                    defaultValue={true}
                  >
                    {category?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='field'>
            <label htmlFor='quantity'>Quantity: </label>
            <input
              type='number'
              name='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>{' '}
          <div className='field'>
            <label htmlFor='price'>Price: </label>
            <input
              type='number'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button
              onClick={() => setEditProduct({ show: false, product: {} })}
            >
              close
            </button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default UpdateProduct;

const Wrapper = styled.section`
  text-align: center;

  .field {
    display: flex;
    margin: 20px 0;
  }

  .field label {
    margin-right: 20px;
  }

  .list-buttons {
    display: flex;
    justify-content: space-between;
  }
`;
