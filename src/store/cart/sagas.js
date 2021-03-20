import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as actions from './index'
import * as services from './services'

export function* registerOrder ({ payload }) {
  try {
    const params = {
        data: {
            action: 'create',
            order: {...payload}
        },
        method: 'POST'
    }
    const response = yield call(services.ordersApi, {...params});
    yield put(actions.registerOrderSuccess(response.data));
} catch (error) {
    yield put(actions.registerOrderFailure(error))
}

}

export function* watchRegisterOrder() {
  yield takeLatest(actions.registerOrderRequest, registerOrder)
}

export default function* ordersSaga() {
  yield all([
    watchRegisterOrder()
  ])
}