import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import {QueryClient, QueryClientProvider} from "react-query";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import './assets/fonts/style.css';
import './assets/_variabless.scss';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RecoilRoot>
          <QueryClientProvider client={queryClient}>
              <App/>
          </QueryClientProvider>
      </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
