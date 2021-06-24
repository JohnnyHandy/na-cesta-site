import React from 'react'
import { useDispatch } from 'react-redux'

import LoginForm from '../../components/form/login'
import { SIGN_IN_REQUEST } from '../../store/auth'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch(SIGN_IN_REQUEST(data))
  }
  return (
    <LoginForm onSubmit={onSubmit} />
  )
}

export default LoginContainer