import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

declare global {
  interface Window {
    ethereum: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
