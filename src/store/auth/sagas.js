import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { navigate } from 'gatsby'
import { success, error } from 'react-notification-system-redux';

import * as actions from './index';
import * as services from './services';

export function* signIn({ payload }) {
  const { data, setErrors, setStatus } = payload
  try {
    setStatus('loading')
    const response = yield call(services.signIn, data);
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
    if(err.response.status === 401){
      const { data: { errors } } = err.response
      setErrors(errors)
    }
    setStatus('waiting')
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
  const { data, setErrors, setStatus } = payload
  try {
    const params = {
      data: {
        type: 'registrations',
        attributes: {
          ...data
        }
      }
    }
    setStatus('loading')
    const response = yield call(services.signUp, params)
    if(response.status === 201){
      yield put(success({
        title: 'Criar conta',
        message: 'Verifique instruções enviadas para o seu email!',
        autoDismiss: 1,
      }));
      setStatus('confirmed')
      yield put(actions.SIGN_UP_SUCCESS())
    }
  } catch (err) {
    if (err.response.status === 422) {
      setStatus('waiting')
      const { response: { data: resError }} = err
      const errorMessages = Object.keys(resError).reduce((ac, error) => {
        let newMessages = []
        resError[error].forEach(msg => {
          if(!ac.includes(msg)){
            newMessages.push(msg)
          }
        })
        return ac.concat(newMessages)
      }, [])
      setErrors(errorMessages)
    }
    yield put(error({
      title: 'Criar conta',
      message: 'Erro ao criar conta',
      autoDismiss: 1,
    }));
    yield put(actions.SIGN_UP_FAILURE())
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
    yield put(actions.updateUserInfo({ user: response.data.data }))
  } catch(error) {
    yield put(actions.verifyCredentialsFailure())
    yield put(actions.SIGN_OUT_SUCCESS())
  }
}

export function * sendPasswordReset ({ payload }) {
  const { data, setStatus, setErrors } = payload
  try {
    setStatus && setStatus('loading')
    const params = {
      data: {
        type: 'passwords',
        attributes: {
          ...data
        }
      }
    }
    yield call(services.sendPasswordReset, params)
    yield put(actions.SEND_PASSWORD_RESET_SUCCESS())
    yield put(success({
      title: 'Alterar ou recuperar senha',
      message: 'Instruções para recuperaçao/alteraçao de senha foram enviadas para o seu email!',
      autoDismiss: 5,
    }));
    setStatus && setStatus('confirmed')
  } catch(err) {
    setStatus && setStatus('waiting')
    setErrors && setErrors(['Falha ao enviar email. Favor tentar novamente em instantes.'])
    yield put(error({
      title: 'Alterar ou recuperar senha',
      message: 'Falha ao enviar email. Favor tentar novamente em instantes.',
      autoDismiss: 1,
    }));

    yield put(actions.SEND_PASSWORD_RESET_FAILURE())
  }
}

export function * resetPassword ({ payload }) {
  const { setStatus, setErrors, data, headers} = payload
  try {
    const params = {
      data: {
        type: 'passwords',
        attributes: {
          ...data
        }
      }
    }
    setStatus('loading')
    yield call(services.resetPassword, {data: params, headers})
    yield put(actions.PASSWORD_RESET_SUCCESS())
    yield put(success({
      title: 'Alterar senha',
      message: 'Senha alterada com sucesso!',
      autoDismiss: 1,
    }));
    navigate('/login')
  } catch(err) {
    navigate('/forgot',  { state: {
      reset: {
        success: false,
        error: 'Erro ao resetar senha, favor tentar novamente.'
      }
    }})
    yield put(error({
      title: 'Alterar senha',
      message: 'Erro ao resetar senha, favor tentar novamente.',
      autoDismiss: 1,
    }));
    yield put(actions.PASSWORD_RESET_FAILURE())
  }
}

export function * confirmAccount ({ payload }){
  const { token, setStatus, setErrors } = payload
  try {
    const response = yield call(services.confirmAccount, token)
    const redirectUrl = response.request.responseURL
    var newURL = new URL(redirectUrl)
    navigate(newURL.pathname)
    yield put(success({
      title: 'Confirmação de conta',
      message: 'Conta confirmada com sucesso!',
      autoDismiss: 1,
    }));
    yield put(actions.CONFIRM_ACCOUNT_REQUEST())
  } catch (err) {
    yield put(actions.CONFIRM_ACCOUNT_FAILURE())
    if (err?.response?.status === 422) {
      setStatus('already')
    } else {
      const errorMsg = 'Erro ao confirmar conta.'
      yield put(success({
        title: 'Confirmação de conta',
        message: 'Conta confirmada com sucesso!',
        autoDismiss: 1,
      }));
        setErrors([errorMsg])
      navigate('/login')
    }
  }
}

export function * verifyReset ({payload}){
  const { token, setErrors, setStatus} = payload
  try {
    const response = yield call(services.verifyReset, token)
    const redirectUrl = response.request.responseURL
    var newURL = new URL(redirectUrl)
    yield put(success({
      title: 'Recuperação de senha',
      message: 'Verificação feita com sucesso!',
      autoDismiss: 1,
    }));
    setStatus('confirmed')
    navigate(`/reset/${newURL.search}`)
    yield put(actions.VERIFY_RESET_SUCCESS())
  } catch(err) {
    yield put(actions.VERIFY_RESET_FAILURE())
    const errorMsg = 'Erro ao resetar senha.'
    setErrors([errorMsg])
    yield put(error({
      title: 'Recuperação de senha',
      message: 'Erro ao resetar senha, favor tentar novamente',
      autoDismiss: 1,
    }));
    navigate('/forgot',  { state: {
      reset: {
        success: false,
        error: 'Erro ao resetar senha, favor tentar novamente.'
      }
    }})
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

export function* watchSendPasswordReset () {
  yield takeLatest(actions.SEND_PASSWORD_RESET_REQUEST, sendPasswordReset)
}

export function * watchPasswordReset () {
  yield takeLatest(actions.PASSWORD_RESET_REQUEST, resetPassword)
}

export function * watchConfirmUser () {
  yield takeLatest(actions.CONFIRM_ACCOUNT_REQUEST, confirmAccount)
}

export function * watchVerifyReset () {
  yield takeLatest(actions.VERIFY_RESET_REQUEST, verifyReset)
}

export default function* AuthSaga() {
  yield all([
    watchSignIn(),
    watchSignOut(),
    watchUpdateCredentials(),
    watchVerifyCredentials(),
    watchSignUp(),
    watchSendPasswordReset(),
    watchPasswordReset(),
    watchConfirmUser(),
    watchVerifyReset()
  ]);
}
