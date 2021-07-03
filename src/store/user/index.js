import { createAction } from '@reduxjs/toolkit'

export const UPDATE_USER_REQUEST = createAction('user: UPDATE_USER_REQUEST')
export const UPDATE_USER_SUCCESS = createAction('user: UPDATE_USER_SUCCESS')
export const UPDATE_USER_FAILURE = createAction('user: UPDATE_USER_FAILURE')

export const UPDATE_PASSWORD_REQUEST = createAction('user:UPDATE_PASSWORD_REQUEST')
export const UPDATE_PASSWORD_SUCCESS = createAction('user:UPDATE_PASSWORD_SUCCESS')
export const UPDATE_PASSWORD_FAILURE = createAction('user:UPDATE_PASSWORD_FAILURE')

export const CREATE_ADDRESS_REQUEST = createAction('user: CREATE_ADDRESS_REQUEST')
export const CREATE_ADDRESS_SUCCESS = createAction('user: CREATE_ADDRESS_SUCCESS')
export const CREATE_ADDRESS_FAILURE = createAction('user: CREATE_ADDRESS_FAILURE')

export const UPDATE_ADDRESS_REQUEST = createAction('user: UPDATE_ADDRESS_REQUEST')
export const UPDATE_ADDRESS_SUCCESS = createAction('user: UPDATE_ADDRESS_SUCCESS')
export const UPDATE_ADDRESS_FAILURE = createAction('user: UPDATE_ADDRESS_FAILURE')