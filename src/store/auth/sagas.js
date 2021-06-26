import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { navigate } from 'gatsby'
import { success, error } from 'react-notification-system-redux';

import * as actions from './index';
import * as services from './services';

export function* signIn({ payload }) {
  try {
    const response = yield call(services.signIn, payload);
    if (response.status === 200) {
      yield put(success({
        title: 'Login',
        message: 'Sucesso!',
        autoDismiss: 1,
      }));
      yield put(actions.updateCredentialsRequest(response.headers));
      yield put(actions.SIGN_IN_SUCCESS(response.data.data));
      navigate(-1)
    }
  } catch (err) {
    yield put(error({
      title: 'Login',
      message: 'Erro',
      autoDismiss: 1,
    }));
    yield put(actions.SIGN_IN_FAILURE());
  }
}

export function* signOut() {
  try {
    const response = yield call(services.signOut);
    if (response.status === 200) {
      yield put(success({
        title: 'Logout',
        message: 'Successo!',
        autoDismiss: 1,
      }));
      yield put(actions.SIGN_OUT_SUCCESS());
    }
  } catch (err) {
    yield put(error({
      title: 'Logout',
      message: 'Erro ao fazer logout',
      autoDismiss: 1,
    }));
    yield put(actions.SIGN_OUT_FAILURE());
  }
}

export function * signUp({ payload }) {
  try {
    const response = yield call(services.signUp, payload)
    if(response.status === 200){
      yield put(success({
        title: 'Criar conta',
        message: 'Successo!',
        autoDismiss: 1,
      }));
      yield put(actions.SIGN_UP_SUCCESS())
    }
  } catch (err) {
    yield put(error({
      title: 'Criar conta',
      message: 'Erro ao criar conta',
      autoDismiss: 1,
    }));
  }
}

export function* updateCredentials({ payload }) {
  try {
    const headers = payload;
    if (
      Object.prototype.hasOwnProperty.call(headers, 'access-token')
      && typeof headers['access-token'] === 'string'
      && headers['access-token'].length
    ) {
      yield put(actions.updateCredentialsSuccess({ headers }));
    }
  } catch (e) {
    yield put(actions.updateCredentialsFailure(e));
  }
}

export function * verifyCredentials () {
  try {
    const response = yield call(services.verifyCredentials)
    yield put(actions.verifyCredentialsSuccess())
  } catch(error) {
    yield put(actions.verifyCredentialsFailure())
  }
}

export function* watchSignIn() {
  yield takeLatest(actions.SIGN_IN_REQUEST, signIn);
}

export function* watchSignOut() {
  yield takeLatest(actions.SIGN_OUT_REQUEST, signOut);
}

export function*  watchSignUp() {
  yield takeLatest(actions.SIGN_UP_REQUEST, signUp)
}

export function* watchUpdateCredentials() {
  yield takeLatest(actions.updateCredentialsRequest, updateCredentials);
}

export function* watchVerifyCredentials() {
  yield takeLatest(actions.verifyCredentialsRequest, verifyCredentials)
}

export default function* AuthSaga() {
  yield all([
    watchSignIn(),
    watchSignOut(),
    watchUpdateCredentials(),
    watchVerifyCredentials(),
    watchSignUp()
  ]);
}
