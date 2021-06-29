import React from 'react'
import { Field, change, clearFields } from 'redux-form'
import { useDispatch } from 'react-redux'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'
import axios from 'axios'

import { required,validCep } from './validation'
import { colors } from '../../utils/constants'

const InputsContainer = styled('div')`
  align-items: flex-start;
  display: grid;
  grid-column-gap: 1em; 
  grid-template-columns: repeat(2,0.8fr);
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

let AddressFormComponent = (props) => {
  const { formValues } = props
  const dispatch = useDispatch()
  const cepFieldValue = formValues && formValues['cep']
  const stateFieldValue = formValues && formValues['state']
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
    const response = await axios.get(fetchCitiesUrl(stateValue?.value)).then(res => res).catch(err => err.response)
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
      dispatch(change('register', 'neighbourhood', bairro))
      dispatch(change('register', 'street', logradouro))
      dispatch(change('register', 'state', findstateFieldValue))
      fetchCitiesInfo({ city: localidade, state: findstateFieldValue })
    }
  }
  return (
          <InputsContainer>
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
            name='street'
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
            name='neighbourhood'
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
          </InputsContainer>
  )
}


export default AddressFormComponent