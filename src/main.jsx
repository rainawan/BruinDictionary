import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NextUIProvider } from '@nextui-org/react';
import { CurrentUserDataProvider } from './providers/CurrentUserDataProvider.jsx';
import App from './App.jsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrentUserDataProvider>
        <BrowserRouter>
          <NextUIProvider>
            <App />
          </NextUIProvider>
        </BrowserRouter>
      </CurrentUserDataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
