import React from 'react'
import { Field } from 'redux-form'


import { required, minPassLength, validEmail, validConfirmPassword } from './validation'
import InputComponent from '../inputs/text/InputComponent'
import { InputsContainer } from './form.styles'


let RegisterFormComponent = (props) => {
  return (
          <InputsContainer>
          <Field
            type='text'
            placeholder='Email'
            name='email'
            component={InputComponent} 
            validate={[required, validEmail]}
          />
          <Field
            type='password'
            placeholder='Senha'
            name='password'
            component={InputComponent}
            validate={[required, minPassLength]}
          />
          <Field
            type='password'
            placeholder='Confirmar senha'
            name='password_confirmation'
            component={InputComponent}
            validate={[required, minPassLength, validConfirmPassword]}
          />
          </InputsContainer>
  )
}


export default RegisterFormComponent