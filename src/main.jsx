import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CurrentUserDataProvider } from './providers/CurrentUserDataProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentUserDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserDataProvider>
  </React.StrictMode>
);
