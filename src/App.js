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
} from './pages';
import ProtectAdmin from './components/ProtectAdmin';
import ProtectSeller from './components/ProtectSeller';
import ProtectCustomer from './components/ProtectCustomer';
import ProtectLogin from './components/ProtectLogin';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import Loading from './components/Loading';

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
            <Route
              path='/singleProductPayment'
              element={<SingleProductPayment />}
            />
            <Route path='/payCartProducts' element={<PayCartProducts />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/sellerInfo/:id' element={<SellerInfo />} />

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
              path='/admintest'
              element={
                <ProtectAdmin>
                  <h1>Welcome admin</h1>
                </ProtectAdmin>
              }
            />

            {/* Seller Routes  */}

            {/* Customer Routes */}

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

const Wrapper = styled.section``;

const WrapperGrow = styled.section`
  min-height: calc(100vh - (104px + 18px));
`;

export default App;

// Put all the required restrictions.
// Seller info page (when we click on seller info on the single product page).
// Account page.
// Work on the css.

// Work on the seller dashboard.

// Work on the admin dashboard.
