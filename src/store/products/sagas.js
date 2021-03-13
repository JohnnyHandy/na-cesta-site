import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as actions from './index'
import * as services from './services'

export function* fetchProducts() {
    try {
        const params = {
            data: {
                action: 'scan'
            },
            method: 'POST'
        }
        const response = yield call(services.productsApi, {...params});
        yield put(actions.fetchProductsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchProductsFailure(error))
    }
}

export function* filterProducts({ payload }) {
    const { paramAttributes } = payload
    try {
        const params = {
            data: {
                action: 'scan',
                paramAttributes
            },
            method: 'POST'
        }
        const response = yield call(services.productsApi, {...params})
        yield put(actions.filterProductsSuccess(response.data))
    } catch(error) {
        console.error(error)
        yield put(actions.filterProductsFailure(error))
    }
}

export function* watchFetchProducts() {
    yield takeLatest(actions.fetchProductsRequest, fetchProducts);
}

export function* watchFilterProducts() {
    yield takeLatest(actions.filterProductsRequest, filterProducts);
}

export default function* ProductsSaga() {
    yield all([
        watchFetchProducts(),
        watchFilterProducts()
    ]);
}