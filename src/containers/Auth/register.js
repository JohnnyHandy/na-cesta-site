import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormValues, isValid, submit } from 'redux-form'

import { SIGN_UP_REQUEST } from '../../store/auth'
import RegisterForm from '../../components/form/register'


const RegisterContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const formValues = getFormValues('register')(state)
  const isFormValid = isValid('register')(state)

  const onSubmit= (data) => {
    console.log('data', data)
    const formattedData = {
      ...data,
      gender: data.gender.value
    }
    dispatch(SIGN_UP_REQUEST(formattedData))
  }
  return (
    <>
    <RegisterForm
      dispatch={dispatch}
      formValues={formValues}
      isFormValid={isFormValid}
      onSubmit={onSubmit}
    />
    </>
  )
}

export default RegisterContainer