import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-fpunihx2aw3ry64u.us.auth0.com";
const clientId = "DZERPk6IMv4JSRXGTHcM2ph8piSb1q3i";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: 'https://crud-nuvem-unifor-1.onrender.com' }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
