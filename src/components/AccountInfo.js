import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../axios/instance';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/globalContext';
import { useAuthContext } from '../contexts/authContext';
import OutsideAlerterAccountInfo from './OutsideAlerterAccountInfo';
import {
  SET_LOADING_TRUE,
  SET_USER,
  SET_LOADING_FALSE,
} from '../utils/actions';

const AccountInfo = ({ showAccountInfo, setShowAccountInfo }) => {
  const [profile, setProfile] = useState('');
  const { dispatch } = useGlobalContext();
  const { user, dispatch: dispatchAuth } = useAuthContext();

  const navigate = useNavigate();

  const goToAccount = () => {
    setShowAccountInfo(false);
    navigate('/account');
  };

  const logout = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });

      await axiosInstance.post(
        `/${user.role}/logout`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );

      localStorage.removeItem('info');
      dispatchAuth({ type: SET_USER });
      dispatch({ type: SET_LOADING_FALSE });
      navigate('/login');
      setShowAccountInfo(false);
    } catch (error) {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const getProfile = async () => {
    try {
      const { data } = await axiosInstance.get(`/${user.role}/profile`, {
        headers: {
          Authorization: 'Bearer ' + user.accessToken,
        },
      });

      if (data.avatarUrl !== null) {
        setProfile(data.avatarUrl.split(' ')[1]);
      } else {
        setProfile('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 500) {
        setShowAccountInfo(false);
      }
    };

    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper style={{ display: `${showAccountInfo ? 'block' : 'none'}` }}>
      <OutsideAlerterAccountInfo setShowAccountInfo={setShowAccountInfo}>
        <div className='profile'>
          <p className='name'>{user.name}</p>
          <img
            src={`${profile !== '' ? profile : '/images/background.png'}`}
            alt=''
          />
          <button className='icon' onClick={goToAccount}>
            <MdEdit />
          </button>
        </div>
        <p className='email'>{user.email}</p>
        <div className='manage-account'>
          <button onClick={goToAccount}>Manage Account</button>
          <button onClick={logout}>Logout</button>
        </div>
      </OutsideAlerterAccountInfo>
    </Wrapper>
  );
};

export default AccountInfo;

const Wrapper = styled.article`
  position: absolute;
  background-color: white;
  color: black;
  z-index: 500;
  border-radius: 5px;
  top: 60px;
  right: 1%;
  width: 350px;
  box-shadow: 0px 0px 3px var(--lightblack);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translateY(40%);
  }

  .profile {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 10px;
    background-color: var(--orange);
    margin-bottom: 50px;
  }

  .name {
    font-size: 16px;
    width: 20%;
    text-align: left;
    color: white;
  }

  .icon {
    color: black;
    font-size: 30px;
  }

  .email {
    padding: 0 10px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }

  .manage-account {
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
  }

  .manage-account button {
    text-align: left;
    font-size: 16px;
  }

  .manage-account button:first-child {
    margin-bottom: 10px;
  }

  button {
    background-color: transparent;
    border: none;
    outline: none;
    transition: all 0.2s linear;
  }

  button:hover {
    font-weight: bold;
  }
`;
