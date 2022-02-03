import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
