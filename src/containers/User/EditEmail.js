import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'

import EditEmailForm from '../../components/form/EditEmail'
import Loading from '../../components/loading'
import { UPDATE_USER_REQUEST } from '../../store/user'
import { FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'

const EditUserDataContainer = () => {
  const [initialValues, setInitialValues] = React.useState()
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const isFormValid = isValid('editUserEmail')(state)
  React.useEffect(() => {
    if(state.auth.user) {
      const { email } = state.auth.user
      const userDataValues = {
        email
      }
      setInitialValues(userDataValues)
    }
  }, [])
  const onSubmit = async (data) => {
    setStatus('loading')
    const formattedData = {
      ...data,
    }
    dispatch(UPDATE_USER_REQUEST({ data: formattedData, id: state.auth.user.id, setErrors, setStatus }))
  }
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
            <>
          <FormTitle> Alterar Email </FormTitle>
          <EditEmailForm
            initialValues={initialValues}
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

export default EditUserDataContainer