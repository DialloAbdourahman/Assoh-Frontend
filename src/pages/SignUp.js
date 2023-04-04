import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { GoPencil } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_LINK } from '../utils/constants';
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  SET_USER,
} from '../utils/actions';

const SignUp = () => {
  const [passwordOneShown, setPasswordOneShown] = useState(false);
  const [passwordTwoShown, setPasswordTwoShown] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { light, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: SET_LOADING_TRUE });

    if (!data.email || !data.name || !data.password || !data.password2) {
      setErrorMessage('Please enter all the fields');
      return;
    }

    if (data.password !== data.password2) {
      setErrorMessage('Passwords mush match');
      return;
    }

    try {
      const user = await axios({
        method: 'post',
        url: `${API_LINK}/users/`,
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      localStorage.setItem('user', JSON.stringify(user.data));
      dispatch({ type: SET_USER, payload: user.data });
      navigate('/');
      dispatch({ type: SET_LOADING_FALSE });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      setErrorMessage(errorMessage);
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 1000);
  }, [errorMessage]);

  return (
    <Wrapper>
      <div
        className='centered-form'
        style={{ background: `${light ? 'white' : 'var(--lightblack)'}` }}
      >
        <h1 style={{ color: `${light ? 'var(--darkblue)' : 'white'}` }}>
          Create your business account on ASSOH
        </h1>
        <form onSubmit={handleSubmit}>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div className='input-container'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              onChange={handleChange}
              value={data.name}
              required
            />
            <GoPencil className='left-icon' />
          </div>
          <div className='input-container'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              onChange={handleChange}
              value={data.email}
              required
            />
            <MdEmail className='left-icon' />
          </div>
          <div className='input-container'>
            <input
              type={passwordOneShown ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Password'
              onChange={handleChange}
              value={data.password}
              required
            />
            <RiLockPasswordLine className='left-icon' />
            <button
              type='button'
              className='show-password'
              onClick={() => setPasswordOneShown(!passwordOneShown)}
            >
              {passwordOneShown ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <div className='input-container'>
            <input
              type={passwordTwoShown ? 'text' : 'password'}
              name='password2'
              id='password2'
              placeholder='Confirm Password'
              onChange={handleChange}
              value={data.password2}
              required
            />
            <RiLockPasswordLine className='left-icon' />
            <button
              type='button'
              className='show-password'
              onClick={() => setPasswordTwoShown(!passwordTwoShown)}
            >
              {passwordTwoShown ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <button type='submit' className='submit'>
            + Register
          </button>
          <p
            className='login-instead'
            style={{ color: `${light ? 'var(--black)' : 'white'}` }}
          >
            Aleardy have an account?{' '}
            <Link to={'/login'} className='alternative'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('/images/background.png');
  background-repeat: no-repeat;
  background-size: 55%;
  background-position: 130% 50%;

  .centered-form {
    margin: 100px 0;
    max-width: 650px;
    width: 80%;
    padding: 20px;
    box-shadow: 0px 0px 7px var(--lightblack);
    display: grid;
    grid-template-columns: 1fr 2fr;
    align-items: center;
    grid-gap: 50px;
    transition: background var(--themetransitionspeed) linear;
    margin-right: 50px;
  }

  .centered-form h1 {
    text-align: center;
    font-size: 25px;
    font-weight: normal;
    transition: color var(--themetransitionspeed) linear;
    font-weight: bold;
  }

  form {
    flex-grow: 1;
  }

  .input-container {
    margin: 20px 0;
    position: relative;
  }

  .input-container input {
    width: 100%;
    padding: 10px 40px;
    border-radius: 3px;
    border: none;
    background-color: var(--lightgrey);
    color: var(--darkblue);
    outline: none;
  }

  .input-container input::placeholder {
    color: var(--darkblue);
  }

  .submit {
    width: 100%;
    background-color: var(--orange);
    border: none;
    outline: none;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 15px;
    color: white;
    font-size: 18px;
  }

  .login-instead {
    text-align: center;
    transition: color var(--themetransitionspeed) linear;
  }

  .left-icon {
    color: var(--darkblue);
    position: absolute;
    left: 3%;
    top: 28%;
  }

  .show-password {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 18px;
    color: var(--darkblue);
    position: absolute;
    right: 3%;
    top: 28%;
  }

  .alternative {
    color: var(--orange);
  }

  .error-message {
    font-weight: bold;
    color: red;
    text-align: center;
    margin: 10px 0;
  }

  @media (max-width: 1100px) {
    background-size: 60%;
    .centered-form {
      margin-right: 200px;
    }
  }

  @media (max-width: 1000px) {
    background-size: 65%;
    background-position: 150% 50%;
  }

  @media (max-width: 900px) {
    background-image: none;
    .centered-form {
      margin-right: 0px;
    }
  }

  @media (max-width: 800px) {
    .centered-form {
      grid-template-columns: 1fr;
      padding: 20px 30px;
    }

    .centered-form h1 {
      margin-bottom: -60px;
    }
  }

  @media (max-width: 650px) {
    .centered-form h1 {
      font-size: 20px;
    }
  }
`;
