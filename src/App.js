import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, SignUp, ContactUs, Products } from './pages';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar, Sidebar, Footer, SubMenu } from './components';
import styled from 'styled-components';
import Loading from './components/Loading';

function App() {
  const { light, user, loading } = useGlobalContext();
  return (
    <Wrapper style={{ background: `${light ? 'white' : 'var(--black)'}` }}>
      <BrowserRouter>
        <Navbar />
        <SubMenu />
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
            <Route path='/products' element={<Products />} />
            <Route
              path='/signup'
              element={
                user.email ? <Navigate to={'/'} replace={true} /> : <SignUp />
              }
            />
            <Route path='/contact' element={<ContactUs />} />
          </Routes>
        </WrapperGrow>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  transition: background var(--themetransitionspeed) linear;
`;

const WrapperGrow = styled.section`
  min-height: calc(100vh - (59px + 18px));
`;

export default App;

// Delay the transition of the carousel.
// Update the font.
// No need to hit the database everytime to get user's information just store it in the jwt.
