import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isValid } from 'redux-form'
import { success } from 'react-notification-system-redux';

import EditUserForm from '../../components/form/EditUserData'

import { updateUser } from '../../store/user/services'
import { updateCredentialsRequest, updateUserInfo } from '../../store/auth'
import { genderOptions } from '../../utils/constants'
import { navigate } from 'gatsby'

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
  }, [])
  const onSubmit = async (data) => {
    setStatus('loading')
    const formattedData = {
      ...data,
      birthday: data?.birthday.toISOString(),
      gender: data?.gender.value,
    }
    await updateUser({params: formattedData, id: state.auth.user.id}).then(res => {
      if(res.status === 200) {
        setStatus('confirmed')
        dispatch(success(
          {
            title: 'Sucesso!',
            message: 'Dados alterados com sucesso',
            autoDismiss: 1,      
          }
        ))
        dispatch(updateCredentialsRequest(res.headers))
        dispatch(updateUserInfo({ user: res.data }))
        navigate('/user/profile')
      }
    }).catch(err => {
      setErrors(['Não foi possível atualizar os dados. Por favor tente novamente em instantes.'])
    })
  }
  return(
    <EditUserForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      status={status}
      errors={errors}
      isFormValid={isFormValid}
    />
  )
}

export default EditUserDataContainer