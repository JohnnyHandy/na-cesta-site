import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'

import EditUserForm from '../../components/form/EditUserData'
import Loading from '../../components/loading'
import { UPDATE_USER_REQUEST } from '../../store/user/'
import { genderOptions } from '../../utils/constants'
import {FormContainer, FormArea, FormTitle, LoginLink, FormErrorSpan } from '../../components/form/form.styles'

const EditUserDataContainer = () => {
  const [initialValues, setInitialValues] = React.useState()
  const [status, setStatus] = React.useState('waiting')
  const [errors, setErrors] = React.useState([])
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const isFormValid = isValid('editUserData')(state)
  React.useEffect(() => {
    if(state.auth.user) {
      const { name, phone, gender, birthday, document } = state.auth.user
      const userDataValues = {
        name,
        phone,
        gender: genderOptions.find(item => item.value === gender),
        birthday: new Date(birthday),
        document
      }
      setInitialValues(userDataValues)
    }
  }, [state.auth.user])
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      birthday: data?.birthday.toISOString(),
      gender: data?.gender.value,
    }
    dispatch(UPDATE_USER_REQUEST({ data: formattedData, id: state.auth.user.id, setStatus, setErrors }))
  }
  return(
    <FormContainer>
      <FormArea>
        {
          status === 'waiting'
          ? (
          <>
            <FormTitle> Alterar dados pessoais </FormTitle>
            <EditUserForm
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
        ) : status === 'loading'
        ? (
          <Loading />
        ) : null}
      </FormArea>
    </FormContainer>
  )
}

export default EditUserDataContainer