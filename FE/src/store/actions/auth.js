import { createAction } from '@reduxjs/toolkit';

export const signUpUser = createAction('auth/signUpUser', (userData) => ({
  payload: userData,
}));

export const signUpUserSuccess = createAction(
  'auth/signUpUserSuccess',
  (user) => ({
    payload: user,
  }),
);

export const signUpUserFailure = createAction(
  'auth/signUpUserFailure',
  (error) => ({
    payload: error,
  }),
);
