import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../utils/actions';

const AdminCreateSeller = ({ setCreateSeller, fetchSellers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useGlobalContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Please, enter all the fields required.');
      return;
    }

    try {
      dispatch({ type: SET_LOADING_TRUE });

      const { data } = await axiosInstance.post(
        `/${user?.role}/createSeller`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      fetchSellers();
      setCreateSeller(false);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h2>Create a new seller</h2>
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
            <label htmlFor='email'>Email: </label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='password'>Password: </label>
            <input
              type='text'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='list-buttons'>
            <button onClick={() => setCreateSeller(false)}>close</button>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default AdminCreateSeller;

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
