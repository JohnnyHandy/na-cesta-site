import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'

import { colors } from '../../utils/constants'

const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  display: grid;
  grid-row-gap: 1em; 
  grid-template-rows: repeat(2,0.8fr);
  padding: 1em;
`

const FormLabel = styled('label')`
    font-size: 1em;
    padding: 0.2em;
` 
const FormTitle = styled('label')`
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
` 

const InputWrapper = styled('div')`
  display: inline-grid;
  text-align: initial
`
const SubmitButton = styled('button')`
  background: ${colors.veranoBlue};
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 2vw;
  font-weight: bold;
  margin: auto;
  padding: 0.5em;
  & :hover {
    color: ${colors.veranoBlue};
    background: white
  }
`
const LoginLink = styled(Link)`
  color: ${colors.veranoBlue};
  font-size: 1.5em;
  margin: 0.5em 0;
`

const InputComponent = ({ input, meta, ...rest }) => {
  const { name } = input
  return (
    <InputWrapper>
      <FormLabel htmlFor={name} >{rest.placeholder}</FormLabel>
      <input {...input} {...rest} />
    </InputWrapper>
  )
}

const LoginFormComponent = ({ handleSubmit, onSubmit }) => {
  return (
    <div
      style={{
        color: '${colors.veranoBlue}',
        display: 'flex',
        fontFamily: 'Quicksand',
        minHeight: '70vh'
      }}
    >
      <div
        style={{
          background: '#f1d6ce',
          margin: 'auto',
          padding: '1.5em',
          textAlign: 'center'
        }}
      >
        <FormTitle> Acesse sua conta </FormTitle>
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
          <SubmitButton
            type='submit'
          >
            Entrar
          </SubmitButton>
        </FormComponent>
        <div
          style={{
            display: 'inline-grid'
          }}
        >
          <LoginLink to='/'>Esqueci a senha</LoginLink>
          <LoginLink to='/registrar'>Registre-se</LoginLink>
        </div>
      </div>
    </div>
  )
}

export default reduxForm({ form: 'login' })(LoginFormComponent)
