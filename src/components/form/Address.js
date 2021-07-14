import React from 'react'
import { Field, change, clearFields } from 'redux-form'
import { css } from '@emotion/core'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { required,validCep } from './validation'
import { InputsContainer, FormButton } from './form.styles'
import InputComponent from '../inputs/text/InputComponent'
import SelectComponent from '../inputs/select/SelectComponent'


const zipcodeUrl = zipcode => `https://viacep.com.br/ws/${zipcode}/json/`
const fetchStatesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
const fetchCitiesUrl = (id) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios?orderBy=Adam`
const fetchCepInfo = (cep) => {
  return axios.get(zipcodeUrl(cep)).then(res => res).catch(err => err.response)
}


let AddressFormComponent = (props) => {
  const { formValues, formName = 'register', initialValues } = props
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
        const formattedStateData = response.data.map(item => ({
          value: item.id,
          label: `${item.sigla} - ${item.nome}`,
          uf: item.sigla
        })).sort(function(a, b){
          if(a.label < b.label) { return -1; }
          if(a.label > b.label) { return 1; }
          return 0;
      })
        setStates(formattedStateData)
        if(initialValues?.state) {
          const initialStateValue = formattedStateData.find(state => state.label === initialValues.state)
          if(initialValues?.city){
            fetchCitiesInfo({ state: initialStateValue, city:initialValues.city })
          }
          dispatch(change(formName, 'state', initialStateValue))
        }
      }
    }
    fetchStatesInfo()
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
        dispatch(change(formName, 'city', getCityInfo))
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
      dispatch(change(formName, 'neighbourhood', bairro))
      dispatch(change(formName, 'street', logradouro))
      dispatch(change(formName, 'state', findstateFieldValue))
      fetchCitiesInfo({ city: localidade, state: findstateFieldValue })
    }
  }
  return (
          <InputsContainer css={css`
              grid-template-columns: 50% 50%;
              column-gap: 1em;
            `
          }>
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
                margin: '0.2em auto',
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