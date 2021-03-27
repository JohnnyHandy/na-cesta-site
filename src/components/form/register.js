import React from 'react'
import { Link } from 'gatsby'
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
  const { name, ...rest } = props
  return (
    <InputWrapper>
      <FormLabel for={name} >{rest.placeholder}</FormLabel>
      <input {...rest}/>
    </InputWrapper>
  )
}

const RegisterComponent = () => {
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
          onSubmit={(data) => console.log('here is data', data)}
        >
          <InputsContainer>
          <InputComponent
            type='text'
            placeholder='Nome'
            name='name'
          />
          <InputComponent
            type='text'
            placeholder='Email'
            name='email'          
          />
          <InputComponent
            type='text'
            placeholder='Genêro'
            name='gender'            
          />
          <InputComponent
            type='text'
            placeholder='Telefone'
            name='phone_number'          
          />
          <InputComponent
            type='text'
            placeholder='CEP'
            name='cep'          
          />
          <InputComponent
            type='text'
            placeholder='Rua e número'
            name='address'          
          />
          <InputComponent
            type='text'
            placeholder='Complemento'
            name='complement'          
          />
          <InputComponent
            type='text'
            placeholder='Bairro'
            name='neighborhood'          
          />
          <InputComponent
            type='text'
            placeholder='Cidade'
            name='city'          
          />
          <InputComponent
            type='text'
            placeholder='Estado'
            name='state'          
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

export default RegisterComponent