import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm, change } from 'redux-form'
import InputMask from 'react-input-mask'
import styled from '@emotion/styled'
import axios from 'axios'

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

const zipcodeUrl = zipcode => `https://viacep.com.br/ws/${zipcode}/json/`
const fetchCepInfo = (cep) => {
  return axios.get(zipcodeUrl(cep)).then(res => res).catch(err => err.response)
}
const InputComponent = (props) => {
  const { input, placeholder, style, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <InputMask placeholder={placeholder} {...input} {...rest} />
    </InputWrapper>
  )
}

let RegisterFormComponent = (props) => {
  const {dispatch, formValues} = props
  const cepValue = formValues && formValues['cep']
  const handleCepSearch = async () => {
    const formattedCepValue = cepValue.replace(/[^0-9]/g, '')
    const response = await fetchCepInfo(formattedCepValue)
    if(response.status === 200){
      const {
        data: {
          bairro,
          localidade,
          logradouro,
          uf
        }
      } = response
      dispatch(change('register', 'neighborhood', bairro))
      dispatch(change('register', 'city', localidade))
      dispatch(change('register', 'address', logradouro))
      dispatch(change('register', 'state', uf))
    }
  }
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
            mask='(99) 99999-9999'
          />
          <Field
            type='text'
            placeholder='CEP'
            name='cep'
            component={InputComponent}
            mask='99999-999'
          />
            <FormButton
              style={{
                fontSize: '1em',
                margin: '0 auto 0 0',
                alignSelf: 'flex-end'
              }}
              disabled={(!cepValue) || (cepValue && cepValue.replace(/[^0-9]/g, '').length !== 8)}
              onClick={handleCepSearch}
            >
              Buscar CEP 
            </FormButton>
          <Field
            type='text'
            placeholder='Rua'
            name='address'
            component={InputComponent}
          />
          <Field
            type='text'
            placeholder='Número'
            name='number'
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
          <FormButton
            type='submit'
          >
            Registrar
          </FormButton>
        </FormComponent>
        <LoginLink to='/entrar'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent