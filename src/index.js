import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import ProgramProvider from './context/program';
import { StyledEngineProvider } from '@mui/material/styles';
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithHistory>
        <ProgramProvider>
          <StyledEngineProvider>
            <App/>
          </StyledEngineProvider>
        </ProgramProvider>
      </Auth0ProviderWithHistory>
    </Router>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
