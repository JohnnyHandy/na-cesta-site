import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate } from 'gatsby'

import LoginForm from '../../components/form/login'
import Loading from '../../components/loading'
import { FormTitle, FormErrorSpan, LoginLink, FormContainer, FormArea } from '../../components/form/form.styles'
import { SIGN_IN_REQUEST } from '../../store/auth'

const LoginContainer = (props) => {
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('waiting')
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  React.useEffect(() => {
    if(isLoggedIn){
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  const onSubmit = (data) => {
    dispatch(SIGN_IN_REQUEST({ data: data, setErrors, setStatus }))
  }
  return (
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
            <>
              <FormTitle> Acesse sua conta </FormTitle>
              <LoginForm onSubmit={onSubmit} />
              {errors.map(error => (
              <FormErrorSpan
                key={error}
              >
                {error}
              </FormErrorSpan>
              ))}
              <LoginLink to='/forgot'>Esqueci a senha</LoginLink>
              <LoginLink to='/registrar'>Registre-se</LoginLink>
            </>
          )
          : status === 'loading'
          ? (
            <Loading />
          ) : null
        }
    </FormArea>
    </FormContainer>
  )
}

export default LoginContainer