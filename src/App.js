import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  SignUp,
  ContactUs,
  Products,
  Error,
  Unauthorized,
  SingleProduct,
  SingleProductPayment,
  SellerInfo,
  Account,
  Cart,
  PayCartProducts,
  SellerDashboard,
  AdminDashboard,
  Help,
} from './pages';
import ProtectAdmin from './components/ProtectAdmin';
import ProtectSeller from './components/ProtectSeller';
import ProtectCustomer from './components/ProtectCustomer';
import ProtectCustomerOrUnauth from './components/ProtectCustomerOrUnauth';
import ProtectLogin from './components/ProtectLogin';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import Loading from './components/Loading';
import SellerStatistics from './components/SellerStatistics';
import SellerProducts from './components/SellerProducts';
import SellerOrders from './components/SellerOrders';
import SellerPayments from './components/SellerPayments';
import AdminStatistics from './components/AdminStatistics';
import AdminSellers from './components/AdminSellers';
import AdminProducts from './components/AdminProducts';
import AdminCustomers from './components/AdminCustomers';

function App() {
  const { light } = useGlobalContext();
  return (
    <Wrapper style={{ background: `${light ? 'white' : 'var(--black)'}` }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Loading />
        <WrapperGrow>
          <Routes>
            {/* General Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/sellerInfo/:id' element={<SellerInfo />} />
            <Route path='/help' element={<Help />} />

            {/* Logged in Routes */}
            <Route
              path='/account'
              element={
                <ProtectLogin>
                  <Account />
                </ProtectLogin>
              }
            />

            {/* Admin Routes  */}
            <Route
              path='/adminDashboard'
              element={
                <ProtectAdmin>
                  <AdminDashboard />
                </ProtectAdmin>
              }
            >
              <Route path='statistics' element={<AdminStatistics />} />
              <Route path='sellers' element={<AdminSellers />} />
              <Route path='products' element={<AdminProducts />} />
              <Route path='customers' element={<AdminCustomers />} />
            </Route>

            {/* Seller Routes  */}
            <Route
              path='/sellerDashboard'
              element={
                <ProtectSeller>
                  <SellerDashboard />
                </ProtectSeller>
              }
            >
              <Route path='statistics' element={<SellerStatistics />} />
              <Route path='products' element={<SellerProducts />} />
              <Route path='orders' element={<SellerOrders />} />
              <Route path='sellerPayments' element={<SellerPayments />} />
            </Route>

            {/* Customer Routes */}
            <Route
              path='/cart'
              element={
                <ProtectCustomerOrUnauth>
                  <Cart />
                </ProtectCustomerOrUnauth>
              }
            />
            <Route
              path='/payCartProducts'
              element={
                <ProtectCustomer>
                  <PayCartProducts />
                </ProtectCustomer>
              }
            />
            <Route
              path='/singleProductPayment'
              element={
                <ProtectCustomer>
                  <SingleProductPayment />
                </ProtectCustomer>
              }
            />

            {/* Error Routes */}
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </WrapperGrow>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const WrapperGrow = styled.section`
  min-height: calc(100vh - (104px + 18px));
`;

export default App;

// Account page. (include a way for the customer to see all his/her seller report and allow him to delete)
// try to see if you can work on the contact seller page.
// Work on the css.

// Work on the seller dashboard.

// Work on the admin dashboard.
