import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid, getFormValues } from 'redux-form'

import AddressForm from '../../components/form/AddressForm'
import Loading from '../../components/loading'
import { UPDATE_ADDRESS_REQUEST } from '../../store/user/'
import {FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'
import { navigate } from 'gatsby'

const CreateAddressContainer = ({ location }) => {
  const [initialValues, setInitialValues] = React.useState()
  const [status, setStatus] = React.useState('loading')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const formValues = getFormValues('address')(state)
  const isFormValid = isValid('address')(state)
  const { id } = state.auth.user

  React.useEffect(() => {
    if(location?.state?.addressId && state.auth.user.addresses.length) {
      const addressInfo = state.auth.user.addresses.find(address => address.id === location.state.addressId)
      setInitialValues(addressInfo)
      setStatus('waiting')
    } else {
      navigate('/users/addresses')
    }
  }, [])

  const onSubmit = async (data) => {
    const { city, state , ...rest } = data
    const formattedData = {
      ...rest,
      city: city.label,
      state: state.label,
      user_id: id
  }
    dispatch(UPDATE_ADDRESS_REQUEST({ data: formattedData, setStatus, setErrors, addressId: location.state.addressId }))
  }
  
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
          <>
            <FormTitle> Editar endereço </FormTitle>
            <AddressForm
              initialValues={initialValues}
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
            <LoginLink to='/user/addresses'>Voltar para meus endereços</LoginLink>
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