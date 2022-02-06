import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { persistedStore, store } from './redux/store.js';
import App from './components/App/App.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import ContainerPage from './components/ContainerPage/ContainerPage';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loader={null} persistor={persistedStore}>
      <BrowserRouter>
        <ContainerPage>
          <App />
        </ContainerPage>
      </BrowserRouter>
      <ToastContainer />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
