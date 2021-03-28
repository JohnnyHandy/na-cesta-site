import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm } from 'redux-form'
import styled from '@emotion/styled'

const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  display: grid;
  grid-column-gap: 1em; 
  grid-template-columns: repeat(2,0.8fr);
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

let RegisterFormComponent = () => {
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
        <FormTitle> Registre-se </FormTitle>
        <FormComponent
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <InputsContainer>
          <Field
            name='name'
            type='text'
            placeholder='Nome'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Email'
            name='email'
            component={InputComponent}                   
          />
          <Field
            type='text'
            placeholder='Genêro'
            name='gender'
            component={InputComponent}                      
          />
          <Field
            type='text'
            placeholder='Telefone'
            name='phone_number'
            component={InputComponent}                  
          />
          <Field
            type='text'
            placeholder='CEP'
            name='cep'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Rua e número'
            name='address'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Complemento'
            name='complement'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Bairro'
            name='neighborhood'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Cidade'
            name='city'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Estado'
            name='state'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Senha'
            name='password'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Confirmar senha'
            name='confirm_password'
            component={InputComponent}     
          />
          </InputsContainer>
          <SubmitButton
            type='submit'
          >
            Registrar
          </SubmitButton>
        </FormComponent>
        <LoginLink to='/entrar'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent