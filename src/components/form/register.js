import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm, change, clearFields } from 'redux-form'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'

import Loading from '../loading'

import { required, minPassLength, validEmail, validConfirmPassword } from './validation'


const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  align-items: flex-start;
  display: grid;
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
const StyledSelect = styled(Select)`

`

const FormButton = styled('button')`
  background: #1A4350;
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 2em;
  font-weight: bold;
  margin: auto;
  padding: 0.5em;
  & :disabled {
    background: white;
    color: #1A4350;
    cursor: not-allowed;
  }
`
const LoginLink = styled(Link)`
  color: #1A4350;
  font-size: 1.5em;
`

const genderOptions = [
  {
    label: 'Masculino',
    value: 'M'
  },
  {
    label: 'Feminino',
    value: 'F'
  },
  {
    label: 'Outro',
    value: 'Outro'
  }
  
]

const InputComponent = (props) => {
  const { input, placeholder, style, meta, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <InputMask placeholder={placeholder} {...input} {...rest} />
      { meta && meta.error && meta.touched && meta.visited && <span style={{ color: 'red' }}> {meta.error} </span> }
    </InputWrapper>
  )
}

let RegisterFormComponent = (props) => {
  const {dispatch, formValues, isFormValid, onSubmit, handleSubmit, errors, status} = props
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
        {status === 'waiting'
        ? (<>
          
        <FormTitle> Registre-se </FormTitle>
        <FormComponent
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputsContainer>
          <Field
            name='name'
            type='text'
            placeholder='Nome'
            component={InputComponent}
            validate={[required]}
          />
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
          {errors.map(error => (
            <span style={{ color: 'red', margin:'0.2em 0' }} key={error}>
              {error}
            </span>
          ))}
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Registrar
          </FormButton>
        </FormComponent>
        </>)
         : status === 'loading' ? (
          <Loading />
        ) : status === 'confirmed' ? (
          <InputsContainer>
            <FormTitle>Conta registrada</FormTitle>
            <span> Para continuar, confirme o seu email através das instruções enviadas par ao email cadastrado! </span>
            <Link to='/'> Ir para o login </Link>
          </InputsContainer>
        ) : null
        }
        <LoginLink to='/login'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent