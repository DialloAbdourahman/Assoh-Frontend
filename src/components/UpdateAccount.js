import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../utils/actions';

const UpdateAccount = ({ setUpdateAccount, profile, getProfile }) => {
  const [name, setName] = useState(profile?.name);
  const [email, setEmail] = useState(profile?.email);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber);
  const [country, setCountry] = useState(profile?.country);
  const [region, setRegion] = useState(profile?.region);
  const [address, setAddress] = useState(profile?.address);

  const { dispatch } = useGlobalContext();
  const { user, refreshToken } = useAuthContext();

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.patch(
        `/${user.role}`,
        { name, email, password, phoneNumber, country, region, address },
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      setUpdateAccount({ show: false, user: {} });
      getProfile();
      refreshToken(user?.role);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  return (
    <Wrapper className='modal'>
      <div className='inside-modal'>
        <h2 className='title'>Update information</h2>
        <form onSubmit={handleUpdate}>
          <div className='field'>
            <label htmlFor='name'>Enter new name: </label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='email'>Enter new email: </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='password'>Enter new password: </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='phoneNumber'>Enter new phoneNumber: </label>
            <input
              type='text'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='country'>Enter new country: </label>
            <input
              type='text'
              id='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='region'>Enter new region: </label>
            <input
              type='text'
              id='region'
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='address'>Enter new address: </label>
            <input
              type='text'
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='buttons'>
            <button type='submit'>Submit</button>
            <button onClick={() => setUpdateAccount({ show: false, user: {} })}>
              close
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default UpdateAccount;

const Wrapper = styled.section`
  .title {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .field {
    margin: 20px 0;
    display: flex;
    align-items: flex-start;
  }

  .field label {
    font-weight: bold;
    margin-right: 10px;
  }

  .field input {
    padding: 5px;
    border-radius: 5px;
  }
`;
