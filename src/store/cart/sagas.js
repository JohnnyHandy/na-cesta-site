import { all, call, put, takeLatest } from 'redux-saga/effects'

import * as actions from './index'

export function* registerOrder ({ payload }) {
  try {
    console.log('payload', payload)
  } catch(error) {
    console.error(error)
  }
}

export function* watchRegisterOrder() {
  takeLatest(actions.registerOrderRequest, registerOrder)
}

export default function* ordersSaga() {
  yield all([
    watchRegisterOrder()
  ])
}