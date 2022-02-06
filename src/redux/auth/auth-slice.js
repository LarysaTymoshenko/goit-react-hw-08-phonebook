import { createSlice } from '@reduxjs/toolkit';
import { usersReducer } from '../users/users-reducer';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null },
  extraReducers: builder => {
    builder.addMatcher(
      usersReducer.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLogged = true;
      },
    );
    builder.addMatcher(
      usersReducer.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLogged = true;
      },
    );
    builder.addMatcher(
      usersReducer.endpoints.logoutUser.matchFulfilled,
      state => {
        state.token = null;
        state.user = null;
        state.isLogged = false;
      },
    );
    builder.addMatcher(
      usersReducer.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
        state.isLogged = true;
      },
    );
  },
});
