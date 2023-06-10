import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, SignUp, ContactUs, Products } from './pages';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar, Sidebar, Footer } from './components';
import styled from 'styled-components';
import Loading from './components/Loading';

function App() {
  const { light, user, loading } = useGlobalContext();
  return (
    <Wrapper style={{ background: `${light ? 'white' : 'var(--black)'}` }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        {loading && <Loading />}
        <WrapperGrow>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={
                user.email ? <Navigate to={'/'} replace={true} /> : <Login />
              }
            />
            <Route
              path='/signup'
              element={
                user.email ? <Navigate to={'/'} replace={true} /> : <SignUp />
              }
            />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<ContactUs />} />
          </Routes>
        </WrapperGrow>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.section``;

const WrapperGrow = styled.section`
  min-height: calc(100vh - (59px + 18px));
`;

export default App;

// Make sure that we don't have to fetch data everytime we open the account information.
// manage the manage account and logout button and give them a hover effect and reduce their width.
