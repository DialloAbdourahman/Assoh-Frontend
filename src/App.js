import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp } from './pages';
import { useGlobalContext } from './contexts/globalContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import styled from 'styled-components';

function App() {
  const { light } = useGlobalContext();
  return (
    <Wrapper style={{ background: `${light ? 'white' : 'var(--black)'}` }}>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <WrapperGrow>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
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

// when we are on that page, the text should turn orange.
// hook up the sign up and log in functionality (login first).
// work on the search mobile component.
// work on the sidebar.
