import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../utils/actions';

const CreateProduct = ({ setCreateProduct, fetchProducts }) => {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const { dispatch, categories } = useGlobalContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !categoryId || !price || !quantity) {
      alert('Please, enter all the fields required.');
      return;
    }

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.post(
        `/${user?.role}/createProduct`,
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
      setCreateProduct(false);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper>
      <h2>Create a new product</h2>
      <button onClick={() => setCreateProduct(false)}>close</button>
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
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value=''>Select a category</option>
            {categories?.map((category) => {
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
        <button>Submit</button>
      </form>
    </Wrapper>
  );
};

export default CreateProduct;

const Wrapper = styled.section``;
