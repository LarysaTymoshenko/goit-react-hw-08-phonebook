import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';
import { contactsReducer } from './contact/contact-reducer';
import { filterReducer } from './filter/filter-reducer';

// const middleware = getDefaultMiddleware => [
//   ...getDefaultMiddleware(),
//   contactsReducer.middleware,
//   logger,
// ];

export const store = configureStore({
  reducer: {
    [contactsReducer.reducerPath]: contactsReducer.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsReducer.middleware),
  logger,
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);
