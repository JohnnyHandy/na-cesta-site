import React from 'react'
import { reduxForm } from 'redux-form'

import { FormComponent, FormButton, InputsContainer } from './form.styles'
import UserDataForm from './UserData'


let EditUserDataForm = (props) => {
  const { isFormValid, onSubmit, handleSubmit } = props
  return (
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <UserDataForm edit={true} />
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

EditUserDataForm = reduxForm({ form: 'editUserData' })(EditUserDataForm)

export default EditUserDataForm