import { navigate } from 'gatsby';
import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';

import { updateCredentialsRequest, updateUserInfo } from '../auth'
import * as actions from './index'
import * as services from './services'

export function * updateUser({ payload }){
  const { data, id, setErrors, setStatus } = payload
  try {
    setStatus('loading')
    const response = yield call(services.updateUser, { params: data, id })
    if(response.status === 200){
      yield put(updateCredentialsRequest(response.headers))
      yield put(updateUserInfo({ user: response.data }))
      yield put(actions.UPDATE_USER_SUCCESS())
      navigate('/user/profile')
    }
  } catch (err) {
    setErrors(['Não foi possível atualizar os dados. Por favor tente novamente em instantes.'])
    setStatus('waiting')
    yield put(actions.UPDATE_USER_FAILURE())
  }
}

export function * updatePassword({payload}) {
  const {data, setErrors, setStatus} = payload
  try { 
    setStatus('loading')
    const response = yield call(services.updatePassword, data)
    if(response.status === 200){
      yield put(updateCredentialsRequest(response.headers))
      yield put(actions.UPDATE_PASSWORD_SUCCESS())
      navigate('/user/profile')
    }
  } catch (err) {
    setStatus('waiting')
    if (err.response.status === 422) {
      const { response: { data: { errors } }} = err
      const errorMessages = Object.keys(errors).filter(item => item !== 'full_messages').reduce((ac, error) => {
        let newMessages = []
        errors[error].forEach(msg => {
          if(!ac.includes(msg)){
            newMessages.push(msg)
          }
        })
        return ac.concat(newMessages)
      }, [])
      setErrors(errorMessages)
    } else {
      setErrors(['Não foi possível atualizar a senha. Por favor tente novamente em instantes.'])
    }
    yield put(actions.UPDATE_PASSWORD_FAILURE())
  }
}

export function* watchUpdateUserData() {
  yield takeLatest(actions.UPDATE_USER_REQUEST, updateUser)
}

export function* watchUpdatePassword(){
  yield takeLatest(actions.UPDATE_PASSWORD_REQUEST, updatePassword)
}

export default function* userSaga() {
  yield all([
    watchUpdateUserData(),
    watchUpdatePassword()
  ])
}