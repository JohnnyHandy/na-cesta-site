import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'

import { required,  minBRPhoneNumberLength, minCpfLength } from './validation'
import { colors, genderOptions } from '../../utils/constants'
import DatePicker from '../inputs/datepicker/datepicker'


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
const StyledSelect = styled(Select)`

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

const DatePickerComponent = (props)=> {
  const { input, placeholder, style, meta, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <DatePicker placeholder={placeholder} {...input} {...rest} />
      { meta && meta.error && meta.touched && meta.visited && <ErrorSpan> {meta.error} </ErrorSpan> }
    </InputWrapper>
  )
}

const SelectComponent = (props) => {
  const { input, placeholder, style, meta, ...rest } = props

  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <StyledSelect {...input} {...rest} onBlur={() => input.onBlur(input.value)} placeholder={placeholder}  />
      { meta && meta.error && meta.touched && meta.visited && <ErrorSpan> {meta.error} </ErrorSpan> }
    </InputWrapper>
  )
}

let RegisterFormComponent = () => {
  return (
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
        placeholder='Telefone'
        name='phone'
        component={InputComponent}
        mask='(99) 99999-9999'
        validate={[required, minBRPhoneNumberLength]}
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
        type='date'
        placeholder='Data de nascimento'
        name='birthday'
        component={DatePickerComponent}
      />
      <Field
        type='text'
        placeholder='CPF'
        name='document'
        component={InputComponent}
        mask='999.999.999-99'
        validate={[required, minCpfLength]}
      />
    </InputsContainer>
  )
}

export default RegisterFormComponent