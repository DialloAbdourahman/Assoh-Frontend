import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalProvider } from './contexts/globalContext';
import { ProductsProvider } from './contexts/productsContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ProductsProvider>
  </React.StrictMode>
);
