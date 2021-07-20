import { createAction } from '@reduxjs/toolkit'


export const CREATE_ORDER_REQUEST = createAction('user: CREATE_ORDER_REQUEST')
export const CREATE_ORDER_SUCCESS = createAction('user: CREATE_ORDER_SUCCESS')
export const CREATE_ORDER_FAILURE = createAction('user: CREATE_ORDER_FAILURE')