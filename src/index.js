import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './contexts/globalContext';
import { ProductsProvider } from './contexts/productsContext';
import { AuthProvider } from './contexts/authContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <GlobalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </GlobalProvider>
    </ProductsProvider>
  </React.StrictMode>
);
