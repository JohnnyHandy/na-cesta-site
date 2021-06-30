import React from 'react'
import { reduxForm } from 'redux-form'

import { FormComponent, FormButton, InputsContainer } from './form.styles'
import UserDataForm from './UserData'


let RegisterFormComponent = (props) => {
  const { isFormValid, onSubmit, handleSubmit } = props
  return (
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <UserDataForm />
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Alterar dados
          </FormButton>
        </FormComponent>
  )
}

RegisterFormComponent = reduxForm({ form: 'editUserData' })(RegisterFormComponent)

export default RegisterFormComponent