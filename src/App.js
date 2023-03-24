import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp } from './pages';
import { useGlobalContext } from './contexts/globalContext';
import { Navbar } from './components';
import Sidebar from './components/Sidebar';

function App() {
  const { user } = useGlobalContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

// Write the condition is such a way that when we are in large screens, we set the sidebar to false and samething for the mobile search component

export default App;
