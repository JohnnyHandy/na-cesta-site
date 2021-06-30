import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'

import EditPasswordForm from '../../components/form/EditPassword'
import Loading from '../../components/loading'
import { UPDATE_PASSWORD_REQUEST } from '../../store/user'
import { FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'

const EditPasswordContainer = () => {
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const isFormValid = isValid('editUserPassword')(state)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setStatus('loading')
    const formattedData = {
      ...data,
    }
    dispatch(UPDATE_PASSWORD_REQUEST({ data: formattedData, setErrors, setStatus }))
  }
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
            <>
          <FormTitle> Alterar senha </FormTitle>
          <EditPasswordForm
            onSubmit={onSubmit}
            status={status}
            errors={errors}
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
          ) : null
          }
      </FormArea>
    </FormContainer>
  )
}

export default EditPasswordContainer