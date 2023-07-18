import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { axiosInstance } from '../axios/instance';
import { useAuthContext } from '../contexts/authContext';
import { useGlobalContext } from '../contexts/globalContext';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../utils/actions';

const SellerInfo = () => {
  const [seller, setSeller] = useState({});
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const { dispatch } = useGlobalContext();
  const { user } = useAuthContext();

  const fetchSeller = async () => {
    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.get(`/seller/seeSeller/${id}`);
      setSeller(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  const reportSeller = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      alert('Sorry, login first');
      return;
    }

    if (user?.role !== 'customer') {
      alert('Sorry, only a customer can report a seller.');
      return;
    }

    if (message === '') {
      alert('Please enter the report message.');
      return;
    }

    try {
      dispatch({ type: SET_LOADING_TRUE });
      const { data } = await axiosInstance.post(
        `/customer/reportSeller`,
        { message, sellerId: seller?.id },
        {
          headers: {
            Authorization: 'Bearer ' + user.accessToken,
          },
        }
      );
      setMessage('');
      alert(data?.message);
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message);
    } finally {
      dispatch({ type: SET_LOADING_FALSE });
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <Wrapper className='container'>
      <div className='inside'>
        <img
          src={
            seller?.avatarUrl
              ? seller.avatarUrl.split(' ')[1]
              : '/images/user.jpg'
          }
          alt=''
        />
        <p>
          <span className='bold'>Name:</span> {seller?.name}
        </p>
        <p>
          <span className='bold'>Email:</span> {seller?.email}
        </p>
        <p>
          <span className='bold'>PhoneNumber:</span>{' '}
          {seller?.phoneNumber ? seller?.phoneNumber : 'N/A'}
        </p>
        <p>
          <span className='bold'>Country:</span>{' '}
          {seller?.country ? seller?.country : 'N/A'}
        </p>
        <p>
          <span className='bold'>Region:</span>{' '}
          {seller?.region ? seller?.region : 'N/A'}
        </p>
        <p>
          <span className='bold'>Address:</span>{' '}
          {seller?.address ? seller?.address : 'N/A'}
        </p>
        <p>
          <span className='bold'>Shipping Countries:</span>{' '}
          {seller?.shippingCountries?.map((country) => `${country}, `)}
        </p>
        <ul>
          <span className='bold'>Shipping regions and prices:</span>{' '}
          {seller?.shippingRegionsAndPrices?.map((region, index) => {
            return (
              <span key={index}>
                {region?.name}: {region?.shippingPrice} FCFA,
              </span>
            );
          })}
        </ul>
        {user?.role === 'customer' && (
          <button className='margin'>Contact seller</button>
        )}
        <form onSubmit={reportSeller} className='form-report'>
          <h2>Report Seller</h2>
          <textarea
            name='message'
            id='message'
            cols='30'
            rows='10'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter your report message.'
          ></textarea>
          <br />
          <button type='submit'>report</button>
        </form>

        {/* {user?.role === 'admin' && (
          <ul>
            <h2>Reports ({seller?.recievedReports?.length})</h2>
            {seller?.recievedReports?.map((report) => {
              return (
                <article key={report?.id}>
                  <p>Reporter: {report?.customer.name}</p>
                  <p>Message: {report?.reportMessage}</p>
                </article>
              );
            })}
          </ul>
        )} */}
      </div>
    </Wrapper>
  );
};

export default SellerInfo;

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
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0px 0px 3px var(--lightblack);
    padding: 20px;
  }

  p {
    margin: 15px;
  }

  .bold {
    font-weight: bolder;
  }

  .form-report {
    margin: 20px 0;
  }

  .form-report h2 {
    margin-bottom: 20px;
  }

  .form-report textarea {
    width: 90%;
    outline: none;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
  }

  button {
    width: 150px;
    padding: 10px 5px;
    background-color: var(--darkblue);
    color: white;
    font-size: 17px;
    border: none;
    border-radius: 5px;
  }

  .margin {
    margin-top: 20px;
  }
`;
