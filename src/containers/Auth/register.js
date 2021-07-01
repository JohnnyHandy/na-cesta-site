import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormValues, isValid } from 'redux-form'
import { navigate } from 'gatsby'

import { SIGN_UP_REQUEST } from '../../store/auth/'
import { FormTitle, LoginLink, FormErrorSpan, FormContainer, FormArea } from '../../components/form/form.styles'
import RegisterForm from '../../components/form/register'
import Loading from '../../components/loading'

const RegisterContainer = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const formValues = getFormValues('register')(state)
  const isFormValid = isValid('register')(state)
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  React.useEffect(() => {
    if(state.auth.isLoggedIn){
      navigate('/')
    }
  }, [])

  const onSubmit = async (data) => {
    const { cep, city, complement, neighbourhood, number, state, street, password_confirmation, ...rest } = data
    const formattedData = {
      ...rest,
      birthday: rest?.birthday.toISOString(),
      gender: rest?.gender.value,
      addresses_attributes: [{
        city: city.label,
        state: state.label,
        number,
        neighbourhood,
        street,
        cep,
        complement
      }]
    }
    dispatch(SIGN_UP_REQUEST({ data: formattedData, setStatus, setErrors }))
  }
  return (
    <FormContainer>
      <FormArea>
        {status === 'waiting'
        ? (
          <>
          <FormTitle> Registre-se </FormTitle>
          <RegisterForm
            dispatch={dispatch}
            formValues={formValues}
            isFormValid={isFormValid}
            onSubmit={onSubmit}
            errors={errors}
            status={status}
          />
          {errors.map(error => (
            <FormErrorSpan
            key={error}
            >
              {error}
            </FormErrorSpan>
          ))}
          <LoginLink to='/login'>Já tenho uma conta</LoginLink>
            </>
        )
        : status === 'loading'
        ? (
          <Loading />
        ) : status === 'confirmed'
        ? (
          <div style={{ display: 'grid' }}>
            <FormTitle>Conta registrada</FormTitle>
            <span> Para continuar, confirme o seu email através das instruções enviadas par ao email cadastrado! </span>
            <LoginLink to='/login'> Ir para o login </LoginLink>
          </div>
        ) : null
        }
      </FormArea>
    </FormContainer>
  )
}

export default RegisterContainer