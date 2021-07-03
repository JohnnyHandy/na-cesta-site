import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid, getFormValues } from 'redux-form'

import AddressForm from '../../components/form/AddressForm'
import Loading from '../../components/loading'
import { CREATE_ADDRESS_REQUEST } from '../../store/user/'
import {FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'

const CreateAddressContainer = () => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const formValues = getFormValues('address')(state)
  const isFormValid = isValid('address')(state)
  const { id } = state.auth.user

  const onSubmit = async (data) => {
    const { city, state , ...rest } = data
    const formattedData = {
      ...rest,
      city: city.label,
      state: state.label,
      user_id: id
  }
    dispatch(CREATE_ADDRESS_REQUEST({ data: formattedData, setStatus, setErrors }))
  }
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
          <>
            <FormTitle> Adicionar endereço </FormTitle>
            <AddressForm
              onSubmit={onSubmit}
              status={status}
              errors={errors}
              isFormValid={isFormValid}
              formValues={formValues}
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
        ) : status === 'loading'
        ? (
          <Loading />
        ) : null}
      </FormArea>
    </FormContainer>
  )
}

export default CreateAddressContainer