import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { InputsContainer, FormButton, FormComponent } from './form.styles'
import { minPassLength, required, validConfirmPassword, validEmail } from './validation'
import InputComponent from '../inputs/text/InputComponent'

let EditEmailComponent = (props) => {
  const { isFormValid, onSubmit, handleSubmit } = props
  return (
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
            <Field
              type='password'
              placeholder='Senha atual'
              name='current_password'
              component={InputComponent} 
              validate={[required]}
            />
            <Field
              type='password'
              placeholder='Nova senha'
              name='password'
              component={InputComponent} 
              validate={[required, minPassLength]}
            />
            <Field
              type='password'
              placeholder='Confirme a nova senha'
              name='password_confirmation'
              component={InputComponent} 
              validate={[required, validConfirmPassword]}
            />
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Salvar
          </FormButton>
        </FormComponent>
  )
}

EditEmailComponent = reduxForm({ form: 'editUserPassword' })(EditEmailComponent)

export default EditEmailComponent