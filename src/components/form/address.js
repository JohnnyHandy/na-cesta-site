import React from 'react'
import { Link } from 'gatsby'
import { Field, reduxForm, change, clearFields } from 'redux-form'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'
import axios from 'axios'

import { required, minBRPhoneNumberLength, minPassLength, validEmail, validCep, validConfirmPassword } from './validation'
import { colors } from '../../utils/colors'

const FormComponent = styled('form')`
  display: grid;
`
const InputsContainer = styled('div')`
  align-items: flex-start;
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
const StyledSelect = styled(Select)`

`

const FormButton = styled('button')`
  background: ${colors.veranoBlue};
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
    color: ${colors.veranoBlue};
    cursor: not-allowed;
  }
`
const LoginLink = styled(Link)`
  color: ${colors.veranoBlue};
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

const zipcodeUrl = zipcode => `https://viacep.com.br/ws/${zipcode}/json/`
const fetchStatesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const fetchCitiesUrl = (id) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios?orderBy=Adam`
const fetchCepInfo = (cep) => {
  return axios.get(zipcodeUrl(cep)).then(res => res).catch(err => err.response)
}
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
const SelectComponent = (props) => {
  const { input, placeholder, style, ...rest } = props

  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <StyledSelect {...input} {...rest} onBlur={() => input.onBlur(input.value)} placeholder={placeholder}  />
    </InputWrapper>
  )
}

let RegisterFormComponent = (props) => {
  const {dispatch, formValues, isFormValid, onSubmit, handleSubmit} = props
  const cepFieldValue = formValues && formValues['custom:cep']
  const stateFieldValue = formValues && formValues['state']
  const passwordValue = formValues && formValues['password']
  const [citiesList, setCities] = React.useState([])
  const [statesList, setStates] = React.useState([])
  const [loadingCities, setLoadingCities] = React.useState(false)
  React.useEffect(() => {
    const fetchStatesInfo = async () => {
      const response = await axios.get(fetchStatesUrl).then(res => res).catch(err => err.response)
      if (response.status === 200) {
        const formattedData = response.data.map(item => ({
          value: item.id,
          label: `${item.sigla} - ${item.nome}`,
          uf: item.sigla
        })).sort(function(a, b){
          if(a.label < b.label) { return -1; }
          if(a.label > b.label) { return 1; }
          return 0;
      })
        setStates(formattedData)
      }
    }
    fetchStatesInfo()
  }, [])
  const fetchCitiesInfo = async ({ city, state }) => {
    setLoadingCities(true)
    let stateValue = state || stateFieldValue
    const response = await axios.get(fetchCitiesUrl(stateValue.value)).then(res => res).catch(err => err.response)
    if(response.status === 200) {
      const formattedData = response.data.map(item => ({
        value: item.id,
        label: item.nome
      })).sort(function(a, b){
        if(a.label < b.label) { return -1; }
        if(a.label > b.label) { return 1; }
        return 0;
    })
      setCities(formattedData)
      if(city){
        const getCityInfo = formattedData.find(item => item.label === city)
        dispatch(change('register', 'city', getCityInfo))
      }
    }
    setLoadingCities(false)
  }

  const handleCepSearch = async () => {
    const formattedcepFieldValue = cepFieldValue.replace(/[^0-9]/g, '')
    const response = await fetchCepInfo(formattedcepFieldValue)
    if(response.status === 200){
      const {
        data: {
          bairro,
          localidade,
          logradouro,
          uf
        }
      } = response
      const findstateFieldValue = statesList.find(item => item.uf === uf)
      dispatch(change('register', 'neighborhood', bairro))
      // dispatch(change('register', 'city', localidade))
      dispatch(change('register', 'address', logradouro))
      dispatch(change('register', 'state', findstateFieldValue))
      fetchCitiesInfo({ city: localidade, state: findstateFieldValue })
    }
  }
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
          padding: '1em',
          textAlign: 'center'
        }}
      >
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
            type='text'
            placeholder='Genêro'
            name='gender'
            component={SelectComponent}
            options={genderOptions}
            validate={[required]}
          />
          <Field
            type='text'
            placeholder='Telefone'
            name='phone_number'
            component={InputComponent}
            mask='(99) 99999-9999'
            validate={[required, minBRPhoneNumberLength]}
          />
          <Field
            type='text'
            placeholder='CEP'
            name='cep'
            component={InputComponent}
            mask='99999-999'
            required={[required, validCep]}
          />
            <FormButton
              style={{
                fontSize: '1em',
                margin: '0 auto 0 0',
                alignSelf: 'flex-end'
              }}
              disabled={(!cepFieldValue) || (cepFieldValue && cepFieldValue.replace(/[^0-9]/g, '').length !== 8)}
              onClick={handleCepSearch}
            >
              Buscar CEP 
            </FormButton>
          <Field
            type='text'
            placeholder='Rua'
            name='address'
            component={InputComponent}
            validate={[required]}
          />
          <Field
            type='text'
            placeholder='Número'
            name='number'
            component={InputComponent}
            validate={[required]}
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
            validate={[required]}
          />
          <Field
            type='text'
            placeholder='Estado'
            name='state'
            component={SelectComponent}
            options={statesList}
            validate={[required]}
            onChange={(_, value) => {
              dispatch(clearFields('register', false, false, 'city'))
              fetchCitiesInfo({ state: value })
            }}
          />
          <Field
            type='text'
            placeholder='Cidade'
            name='city'
            component={SelectComponent}
            options={citiesList}
            isLoading={loadingCities}
            validate={[required]}
          />
          <Field
            type='password'
            placeholder='Senha'
            name='password'
            component={InputComponent}
            validate={[required, minPassLength]}
          />
          {/* <Field
            type='password'
            placeholder='Confirmar senha'
            name='confirm_password'
            component={InputComponent}
            validate={[required, minPassLength, validConfirmPassword]}
          /> */}
          </InputsContainer>
          <FormButton
            type='submit'
            disabled={!isFormValid}
          >
            Registrar
          </FormButton>
        </FormComponent>
        <LoginLink to='/login'>Já tenho uma conta</LoginLink>
      </div>
    </div>
  )
}

RegisterFormComponent = reduxForm({ form: 'register' })(RegisterFormComponent)

export default RegisterFormComponent