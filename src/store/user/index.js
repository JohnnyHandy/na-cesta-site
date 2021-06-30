import { createAction } from '@reduxjs/toolkit'

export const UPDATE_USER_REQUEST = createAction('user: UPDATE_USER_REQUEST')
export const UPDATE_USER_SUCCESS = createAction('user: UPDATE_USER_SUCCESS')
export const UPDATE_USER_FAILURE = createAction('user: UPDATE_USER_FAILURE')

export const UPDATE_PASSWORD_REQUEST = createAction('user:UPDATE_PASSWORD_REQUEST')
export const UPDATE_PASSWORD_SUCCESS = createAction('user:UPDATE_PASSWORD_SUCCESS')
export const UPDATE_PASSWORD_FAILURE = createAction('user:UPDATE_PASSWORD_FAILURE')