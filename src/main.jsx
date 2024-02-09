import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUserDataProvider } from './providers/CurrentUserDataProvider.jsx';
import App from './App.jsx';
import './index.css';
import '@sumup/design-tokens/light.css';
// import '@sumup/circuit-ui/styles.css';
import { css } from '@emotion/react';

const Layout = css`
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
    env(safe-area-inset-left);
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentUserDataProvider>
      <BrowserRouter>
        <div css={Layout}>
          <App />
        </div>
      </BrowserRouter>
    </CurrentUserDataProvider>
  </React.StrictMode>
);
