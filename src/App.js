import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useGlobalContext } from './contexts/globalContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import ContactUs from './pages/ContactUs';

function App() {
  const { light, user } = useGlobalContext();
  return (
    <Wrapper style={{ background: `${light ? 'white' : 'var(--black)'}` }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
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
  height: calc(100vh - (59px + 18px));
`;

export default App;

// create a custome alert component.
// create a loading.
// create index.js for components and pages.
