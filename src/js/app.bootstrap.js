/*
App.Bootstrap
*/

//
import 'babel-polyfill';
//
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//
import configureStore from 'store/configureStore';
import App from './app';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = configureStore(preloadedState || {});

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('app')
);