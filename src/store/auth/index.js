import { createAction, createReducer } from '@reduxjs/toolkit';

export const SIGN_IN_REQUEST = createAction('auth/SIGN_IN_REQUEST');
export const SIGN_IN_SUCCESS = createAction('auth/SIGN_IN_SUCCESS');
export const SIGN_IN_FAILURE = createAction('auth/SIGN_IN_FAILURE');

export const SIGN_UP_REQUEST = createAction('auth/SIGN_UP_REQUEST');
export const SIGN_UP_SUCCESS = createAction('auth/SIGN_UP_SUCCESS');
export const SIGN_UP_FAILURE = createAction('auth/SIGN_UP_FAILURE');

export const SIGN_OUT_REQUEST = createAction('auth/SIGN_OUT_REQUEST');
export const SIGN_OUT_SUCCESS = createAction('auth/SIGN_OUT_SUCCESS');
export const SIGN_OUT_FAILURE = createAction('auth/SIGN_OUT_FAILURE');

export const CONFIRM_ACCOUNT_REQUEST = createAction('auth/CONFIRM_ACCOUNT_REQUEST')
export const CONFIRM_ACCOUNT_SUCCESS = createAction('auth/CONFIRM_ACCOUNT_SUCCESS')
export const CONFIRM_ACCOUNT_FAILURE = createAction('auth/CONFIRM_ACCOUNT_FAILURE')

export const updateUserInfo = createAction('auth/UPDATE_USER_INFO')
 
export const updateCredentialsRequest = createAction(
  'auth: UPDATE_CREDENTIALS_REQUEST',
);
export const updateCredentialsSuccess = createAction(
  'auth: UPDATE_CREDENTIALS_SUCCESS',
);
export const updateCredentialsFailure = createAction(
  'auth: UPDATE_CREDENTIALS_FAILURE',
);

export const verifyCredentialsRequest = createAction(
  'auth: VERIFY_CREDENTIALS_REQUEST'
);

export const verifyCredentialsSuccess = createAction(
  'auth: VERIFY_CREDENTIALS_SUCCESS'
)

export const verifyCredentialsFailure = createAction(
  'auth: VERIFY_CREDENTIALS_FAILURE'
)

export const SEND_PASSWORD_RESET_REQUEST = createAction('auth: SEND_PASSWORD_RESET_REQUEST')
export const SEND_PASSWORD_RESET_SUCCESS = createAction('auth: SEND_PASSWORD_RESET_SUCCESS')
export const SEND_PASSWORD_RESET_FAILURE = createAction('auth: SEND_PASSWORD_RESET_FAILURE')

export const PASSWORD_RESET_REQUEST = createAction('auth: PASSWORD_RESET_REQUEST')
export const PASSWORD_RESET_SUCCESS = createAction('auth: PASSWORD_RESET_SUCCESS')
export const PASSWORD_RESET_FAILURE = createAction('auth: PASSWORD_RESET_FAILURE')

export const VERIFY_RESET_REQUEST = createAction('auth: VERIFY_RESET_REQUEST')
export const VERIFY_RESET_SUCCESS= createAction('auth: VERIFY_RESET_SUCCESS')
export const VERIFY_RESET_FAILURE = createAction('auth: VERIFY_RESET_FAILURE')


export const initialState = {
  isLoggedIn: false,
  error: null,
  credentials: {},
  isLoading: false,
  user: null,
};

export const AuthReducer = createReducer(initialState, {
  [SIGN_IN_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),
  [SIGN_IN_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    user: action.payload,
    isLoggedIn: true,
  }),
  [SIGN_IN_FAILURE]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),
  [SIGN_OUT_SUCCESS]: () => ({
    ...initialState,
  }),
  [updateCredentialsSuccess]: (state, action) => ({
    ...state,
    credentials: action.payload.headers,
  }),
  [updateUserInfo]: (state, action) => ({
    ...state,
    user: action.payload.user
  })
});
