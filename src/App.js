import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp } from './pages';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar } from './components';

function App() {
  const { user } = useGlobalContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
