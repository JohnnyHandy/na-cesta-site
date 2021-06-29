import React from 'react'
import { Field } from 'redux-form'
import InputMask from 'react-input-mask'
import styled from '@emotion/styled'


import { required, minPassLength, validEmail, validConfirmPassword } from './validation'
import { colors } from '../../utils/constants'

const InputsContainer = styled('div')`
  align-items: flex-start;
  align-content: flex-start;
  display: grid;
  padding: 1em;
`

const FormLabel = styled('label')`
    color: ${colors.veranoBlue};
    font-size: 1em;
    padding: 0.2em;
` 

const InputWrapper = styled('div')`
  display: inline-grid;
  text-align: initial
`



const ErrorSpan = styled('span')`
  color: red;
  font-size: 0.7em;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  max-width: 15em;
  margin:auto;
`



const InputComponent = (props) => {
  const { input, placeholder, style, meta, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <InputMask placeholder={placeholder} {...input} {...rest} />
      { meta && meta.error && meta.touched && meta.visited && <ErrorSpan> {meta.error} </ErrorSpan> }
    </InputWrapper>
  )
}


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