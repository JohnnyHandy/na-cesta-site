import { createAction, createReducer } from '@reduxjs/toolkit'

export const addToCart = createAction('cart/ADD_TO_CART')
export const removeFromCart = createAction('cart/REMOVE_FROM_CART')
export const clearCart = createAction('cart/CLEAR_CART')

export const registerOrderRequest = createAction('cart/REGISTER_ORDER_REQUEST')
export const registerOrderSuccess = createAction('cart/REGISTER_ORDER_SUCCESS')
export const registerOrderFailure = createAction('cart/REGISTER_ORDER_FAILURE')
 

export const initialState = {
  items: [],
  isFetching: false,
  error: null
}

export const CartReducer = createReducer(initialState, {
  [addToCart]: (state, action) => ({
    ...state,
    items: state.items.concat(action.payload)
  }),
  [removeFromCart]: (state, action) => ({
    ...state,
    items: state.items.filter(item => item.info.ProductId !== action.payload.id)
  }),
  [clearCart]: () => ({
    ...initialState
  }),
  [registerOrderRequest]: (state) => ({
    ...state,
    isFetching: true,
    error: null
  }),
  [registerOrderSuccess]: (state) => ({
    ...state,
    isFetching: false
  }),
  [registerOrderFailure]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload
  })
})
