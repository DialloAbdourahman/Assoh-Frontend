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
    <Wrapper>
      <img
        src={
          seller?.avatarUrl
            ? seller.avatarUrl.split(' ')[1]
            : '/images/user.jpg'
        }
        alt=''
      />
      <p>Name: {seller?.name}</p>
      <p>Email: {seller?.email}</p>
      <p>PhoneNumber: {seller?.phoneNumber ? seller?.phoneNumber : 'N/A'}</p>
      <p>Country: {seller?.country ? seller?.country : 'N/A'}</p>
      <p>Region: {seller?.region ? seller?.region : 'N/A'}</p>
      <p>Address: {seller?.address ? seller?.address : 'N/A'}</p>
      <p>
        Shipping Countries:{' '}
        {seller?.shippingCountries?.map((country) => `${country}, `)}
      </p>
      <ul>
        Shipping regions and prices:{' '}
        {seller?.shippingRegionsAndPrices?.map((region, index) => {
          return (
            <li key={index}>
              {region?.name}: {region?.shippingPrice}FCFA
            </li>
          );
        })}
      </ul>

      <form onSubmit={reportSeller}>
        <h2>Report Seller</h2>
        <textarea
          name='message'
          id='message'
          cols='30'
          rows='10'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type='submit'>report</button>
      </form>

      {user?.role === 'admin' && (
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
      )}
      <button>Contact seller</button>
    </Wrapper>
  );
};

export default SellerInfo;

const Wrapper = styled.section``;
