import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storageSession from 'redux-persist/lib/storage/session';
import { contactsReducer } from './contact/contact-reducer';
import { filterReducer } from './filter/filter-reducer';
import { usersReducer } from './users/users-reducer';
import { authSlice } from './auth/auth-slice';

const middleware = getDefaultMiddleware => [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  contactsReducer.middleware,
  usersReducer.middleware,
];

const persistConfig = {
  key: 'auth',
  storage: storageSession,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    [usersReducer.reducerPath]: usersReducer.reducer,
    [contactsReducer.reducerPath]: contactsReducer.reducer,
    [authSlice.name]: persistedAuthReducer,
    filter: filterReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);

export const persistedStore = persistStore(store);
