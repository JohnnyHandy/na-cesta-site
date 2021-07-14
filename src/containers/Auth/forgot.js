import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'

import { host } from '../../utils/http'
import EmailForm from '../../components/form/EmailForm'
import Loading from '../../components/loading'
import { SEND_PASSWORD_RESET_REQUEST } from '../../store/auth'
import { FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'

const ForgotPassword = ({ location }) => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const isFormValid = isValid('emailForm')(state)
  const onSubmit = async (data) => {
    setStatus('loading')
    const formattedData = {
      ...data,
      redirect_url: `${host}/reset`
    }
    dispatch(SEND_PASSWORD_RESET_REQUEST({ data: formattedData, setErrors, setStatus }))
  }
  React.useEffect(() => {
    if(location?.state?.reset?.success === false){
      setErrors([location.state.reset.error])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
            <>
          <FormTitle> Recuperar senha </FormTitle>
          <EmailForm
            onSubmit={onSubmit}
            isFormValid={isFormValid}
          />
          {errors.map(error => (
            <FormErrorSpan
              key={error}
            >
              {error}
            </FormErrorSpan>
          ))}
          <LoginLink to='/user/profile'>Voltar para meus dados</LoginLink>
          </>
          )
          : status === 'loading'
          ? (
            <Loading />
          )
          : status ==='confirmed'
          ? (
            <div
              style={{ display: 'grid' }}
            >
            <FormTitle>Recuperar senha</FormTitle>
              <span> Instruções para recuperação de senha enviadas para o email informado! </span>
              <LoginLink to='/login'> Ir para o login </LoginLink>
            </div>

          ) : null
          }
      </FormArea>
    </FormContainer>
  )
}

export default ForgotPassword