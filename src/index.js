import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./app/store"
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor} from './app/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      <App />
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>
);
