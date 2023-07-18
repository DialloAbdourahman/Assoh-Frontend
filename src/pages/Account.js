import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { axiosInstance } from '../axios/instance';
import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../utils/actions';
import UpdateAccount from '../components/UpdateAccount';

const Account = () => {
  const [profile, setProfile] = useState({});
  const [updateAccount, setUpdateAccount] = useState({
    show: false,
    user: {},
  });

  const { user } = useAuthContext();
  const { dispatch } = useGlobalContext();

  const getProfile = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.get(`/${user.role}/profile`, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      });
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.post(
        `/${user?.role}/avatarUpload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      setProfile({ ...profile, avatarUrl: data.avatarUrl });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Wrapper className='container'>
      <div className='inside'>
        <img
          src={
            profile?.avatarUrl !== ''
              ? profile?.avatarUrl?.split(' ')[1]
              : '/images/user.jpg'
          }
          alt=''
        />
        <input
          type='file'
          className='image-upload'
          onChange={handleImageUpload}
        />
        <p>Name: {profile?.name}</p>
        <p>Email: {profile?.email}</p>
        <p>
          PhoneNumber: {profile?.phoneNumber ? profile?.phoneNumber : 'N/A'}
        </p>
        <p>Country: {profile?.country ? profile?.country : 'N/A'}</p>
        <p>Region: {profile?.region ? profile?.region : 'N/A'}</p>
        <p>Address: {profile?.address ? profile?.address : 'N/A'}</p>
        {user?.role === 'seller' && (
          <>
            <p>
              Shipping Countries:{' '}
              {profile?.shippingCountries?.map((country) => `${country}, `)}
            </p>
            <ul>
              Shipping regions and prices:{' '}
              {profile?.shippingRegionsAndPrices?.map((region, index) => {
                return (
                  <li key={index}>
                    {region?.name}: {region?.shippingPrice} FCFA
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <button onClick={() => setUpdateAccount({ show: true, user: profile })}>
          Update information
        </button>
        {updateAccount.show && (
          <UpdateAccount
            setUpdateAccount={setUpdateAccount}
            profile={profile}
            getProfile={getProfile}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Account;

const Wrapper = styled.section`
  margin-top: 20px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .inside {
    width: 60%;
    margin: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 3px var(--lightblack);
    padding: 20px;
  }

  p {
    margin: 15px;
  }

  .bold {
    font-weight: bolder;
  }

  .image-upload {
    margin-left: 11%;
  }

  button {
    width: 30%;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }
`;
