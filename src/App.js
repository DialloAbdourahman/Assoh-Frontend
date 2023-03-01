import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp, Splash } from './pages';
import { useGlobalContext } from './contexts/globalContext';

function App() {
  const { user } = useGlobalContext();
  return (
    <BrowserRouter>
      {/* Navbar or Sidebar maybe */}
      <Routes>
        <Route path='/' element={user ? <Home /> : <Splash />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
