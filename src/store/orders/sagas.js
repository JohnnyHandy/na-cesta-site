import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';

import * as services from './services'
import * as actions from './index'
import { updateCredentialsRequest } from '../auth'

export function * createOrders ({ payload }) {
  try {
    const params = {
      data: {
        type: 'orders',
        attributes: {
          ...payload
        }
      }
    }
    const response = yield call(services.createOrder, params)
    yield put(updateCredentialsRequest(response.headers))
    yield put(actions.CREATE_ORDER_SUCCESS())
  } catch (err) {
    yield put(actions.CREATE_ORDER_FAILURE())
  }
}
export function * watchOrdersSagas () {
  yield takeLatest(actions.CREATE_ORDER_REQUEST, createOrders)
}

export default function* ordersSaga() {
  yield all([watchOrdersSagas()])
}