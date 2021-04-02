import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'

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
  background: #1A4350;
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 2vw;
  font-weight: bold;
  margin: auto;
  padding: 0.5em;
  & :hover {
    color: #1A4350;
    background: white
  }
`
const LoginLink = styled(Link)`
  color: #1A4350;
  font-size: 1.5em;
`

const InputComponent = (props) => {
  console.log('props', props)
  const { input, placeholder, ...rest } = props
  return (
    <InputWrapper>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <input placeholder={placeholder} {...input}/>
    </InputWrapper>
  )
}

const LoginFormComponent = () => {
  return (
    <div
      style={{
        color: '#1A4350',
        display: 'flex',
        fontFamily: 'Quicksand',
        minHeight: '70vh'
      }}
    >
      <div
        style={{
          background: '#f1d6ce',
          margin: 'auto',
          padding: '1em',
          textAlign: 'center'
        }}
      >
        <FormTitle> Acesse sua conta </FormTitle>
        <FormComponent
          onSubmit={(e) => {
            e.preventDefault()
            console.log('e', e)
          }}
        >
          <InputsContainer>
          <Field
            type='text'
            placeholder='Email'
            name='email'
            component={InputComponent}                   
          />
          <InputComponent
            type='password'
            placeholder='Senha'
            name='password'          
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
          <LoginLink to='/registrar'>Ainda não tem uma conta? Registre-se</LoginLink>
        </div>
      </div>
    </div>
  )
}

export default reduxForm({ form: 'login' })(LoginFormComponent)
