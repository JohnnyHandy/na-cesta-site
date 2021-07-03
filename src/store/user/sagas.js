import { navigate } from 'gatsby';
import {
  put, call, takeLatest, all,
} from 'redux-saga/effects';
import { success, error } from 'react-notification-system-redux';

import { updateCredentialsRequest, updateUserInfo, verifyCredentialsRequest } from '../auth'
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
      yield put(success({
        title: 'Alterar dados',
        message: 'Dados alterados com sucesso!',
        autoDismiss: 1,
      }));  
      navigate('/user/profile')
    }
  } catch (err) {
    setErrors(['Não foi possível atualizar os dados. Por favor tente novamente em instantes.'])
    setStatus('waiting')
    yield put(error({
      title: 'Alterar dados',
      message: 'Não foi possível atualizar os dados. Por favor tente novamente em instantes.',
      autoDismiss: 1,
    }));  
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
      yield put(success({
        title: 'Alterar senha',
        message: 'Senha alterada com sucesso',
        autoDismiss: 1,
      }));  
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
      yield put(error({
        title: 'Alterar senha',
        message: 'Não foi possível atualizar a senha. Por favor tente novamente em instantes.',
        autoDismiss: 1,
      }));  
      setErrors(['Não foi possível atualizar a senha. Por favor tente novamente em instantes.'])
    }
    yield put(actions.UPDATE_PASSWORD_FAILURE())
  }
}

export function * createAddress ({ payload }) {
  const { data, setErrors, setStatus } = payload
  try {
    setStatus('loading')
    const response = yield call(services.createAddress, data)
    if(response.status === 201){
      yield put(verifyCredentialsRequest())
      yield put(success({
        title: 'Criar endereço',
        message: 'Endereço criado com sucesso',
        autoDismiss: 1,
      }));
      yield put(actions.CREATE_ADDRESS_SUCCESS())
    }
  } catch (err) {
    yield put(actions.CREATE_ADDRESS_FAILURE())
    yield put(error({
      title: 'Criar endereço',
      message: 'Não foi possível criar o endereço. Por favor tente novamente em instantes.',
      autoDismiss: 1,
    }));  
    setErrors(['Não foi possível criar o endereço. Por favor tente novamente em instantes.'])
  } finally {
    navigate('/user/addresses')
  }
}

export function * updateAddress ({ payload }) {
  const { data, setErrors, setStatus, addressId } = payload
  try {
    setStatus('loading')
    const response = yield call(services.updateAddress, { params: data, addressId })
    if(response.status === 201){
      yield put(verifyCredentialsRequest())
      yield put(success({
        title: 'Editar endereço',
        message: 'Endereço editado com sucesso',
        autoDismiss: 1,
      }));
      yield put(actions.UPDATE_ADDRESS_SUCCESS())
    }
  } catch (err) {
    yield put(actions.UPDATE_ADDRESS_FAILURE())
    yield put(error({
      title: 'Editar endereço',
      message: 'Não foi possível editar o endereço. Por favor tente novamente em instantes.',
      autoDismiss: 1,
    }));  
    setErrors(['Não foi possível editar o endereço. Por favor tente novamente em instantes.'])
  } finally {
    navigate('/user/addresses')
  }
}

export function* watchUpdateUserData() {
  yield takeLatest(actions.UPDATE_USER_REQUEST, updateUser)
}

export function* watchUpdatePassword(){
  yield takeLatest(actions.UPDATE_PASSWORD_REQUEST, updatePassword)
}

export function* watchCreateAddress(){
  yield takeLatest(actions.CREATE_ADDRESS_REQUEST, createAddress)
}

export function* watchUpdateAddress() {
  yield takeLatest(actions.UPDATE_ADDRESS_REQUEST, updateAddress)
}

export default function* userSaga() {
  yield all([
    watchUpdateUserData(),
    watchUpdatePassword(),
    watchCreateAddress(),
    watchUpdateAddress()
  ])
}