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

export function* watchFetchProducts() {
    yield takeLatest(actions.fetchProductsRequest, fetchProducts);
}

export default function* ProductsSaga() {
    yield all([
        watchFetchProducts()
    ]);
}