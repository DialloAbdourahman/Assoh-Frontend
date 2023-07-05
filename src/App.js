import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  Home,
  Login,
  SignUp,
  ContactUs,
  Products,
  Error,
  Unauthorized,
} from './pages';
import ProtectAdmin from './components/ProtectAdmin';
import { useGlobalContext } from './contexts/globalContext';
import { useAuthContext } from './contexts/authContext';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import Loading from './components/Loading';

function App() {
  const { light } = useGlobalContext();
  const { user } = useAuthContext();
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

// Make sure that we don't have to fetch data everytime we open the account information.
// manage the manage account and logout button and give them a hover effect and reduce their width.
