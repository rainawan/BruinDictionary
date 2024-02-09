import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CurrentUserDataProvider } from './providers/CurrentUserDataProvider.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentUserDataProvider>
      <App />
    </CurrentUserDataProvider>
  </React.StrictMode>
);
