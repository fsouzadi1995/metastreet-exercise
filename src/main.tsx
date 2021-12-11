import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/globals.css';

declare global {
  interface Window {
    ethereum: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
