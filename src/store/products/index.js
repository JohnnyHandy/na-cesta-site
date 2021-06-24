import { createAction, createReducer } from '@reduxjs/toolkit'

export const fetchProductsRequest = createAction('Products/FETCH_PRODUCTS_REQUEST');
export const fetchProductsSuccess = createAction('Products/FETCH_PRODUCTS_SUCCESS');
export const fetchProductsFailure = createAction('Products/FETCH_PRODUCTS_FAILURE');

export const filterProductsRequest = createAction('Products/FILTER_PRODUCTS_REQUEST');
export const filterProductsSuccess = createAction('Products/FILTER_PRODUCTS_SUCCESS');
export const filterProductsFailure = createAction('Products/FILTER_PRODUCTS_FAILURE');

export const setFilters = createAction('Products/SET_FILTERS')

export const clearProductsList = createAction('Products/CLEAR_PRODUCTS_LIST');

export const initialState = {
    items: [],
    isFetching: false,
    filters: {
     price:[],
     size: []
    },
    error: null,
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
    }),
    [filterProductsRequest]: (state) => ({
        ...state,
        isFetching: true
    }),
    [filterProductsSuccess]: (state, action) => ({
        ...state,
        isFetching: false,
        items: action.payload
    }),
    [filterProductsFailure]: (state, action) => ({
        ...state,
        isFetching: false,
        error: action.payload
    }),
    [clearProductsList]: (state) => ({
        ...initialState
    }),
    [setFilters]: (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        [action.payload.filter]: action.payload.value
      }
    })
})