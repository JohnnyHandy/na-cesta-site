import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormComponent, InputsContainer, FormButton} from './form.styles'
import InputComponent from '../inputs/text/InputComponent'


const LoginFormComponent = ({ handleSubmit, onSubmit }) => {
  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputsContainer>
      <Field
        type='text'
        placeholder='Email'
        name='email'
        component={InputComponent}                   
      />
      <Field
        type='password'
        name='password'
        placeholder='Senha'
        component={InputComponent}
      />
      </InputsContainer>
      <FormButton
        type='submit'
      >
        Entrar
      </FormButton>
    </FormComponent>
  )
}

export default reduxForm({ form: 'login' })(LoginFormComponent)
