import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Market from './Market';
import reportWebVitals from './reportWebVitals';
import { TransactionsProvider } from './context/TransactionContext';
import { MoralisProvider } from 'react-moralis';
import Order from './Order';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <MoralisProvider
        appId='8j9GV5RG9OB9FVk0S8D2Y4Q9iTkQP4fdCrbQAOlA'
        serverUrl='https://qxcqtsrjdutz.usemoralis.com:2053/server'
      >
        <TransactionsProvider>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/market' element={<Market />} />
            <Route path='/order' element={<Order />} />
          </Routes>
        </TransactionsProvider>
      </MoralisProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
