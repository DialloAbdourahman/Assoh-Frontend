import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Login = () => {
  const [passwordOneShown, setPasswordOneShown] = useState(false);

  const { light } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          <div className='input-container'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
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
              required
            />
            <RiLockPasswordLine className='left-icon' />
            <button
              className='show-password'
              onClick={() => setPasswordOneShown(!passwordOneShown)}
            >
              {passwordOneShown ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>
          <button type='submit' className='submit'>
            + Register
          </button>
          <p
            className='login-instead'
            style={{ color: `${light ? 'var(--black)' : 'white'}` }}
          >
            Don't yet have an account?{' '}
            <Link to={'/signup'} className='alternative'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

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

export default Login;
