import { createAction, createReducer } from '@reduxjs/toolkit'

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE');

export const initialState = {
    items: [],
    isFetching: false,
    error: null,
    filters: {
        size: '',
        price: ''
    }
}

export const ProductsReducer = createReducer(initialState, {
    [fetchProductsRequest]: (state) => ({
        ...state,
        isFetching: true,
        error: null
    }),
    [fetchProductsSuccess]: (state, action) => ({
        ...state,
        isFetching: false,
        items: action.payload
    }),
    [fetchProductsFailure]: (state, action) => ({
        ...state,
        isFetching: false,
        items: action.payload
    })
})