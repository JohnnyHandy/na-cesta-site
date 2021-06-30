import React from 'react'
import { Field, reduxForm } from 'redux-form'
import InputMask from 'react-input-mask'
import Select from 'react-select'
import styled from '@emotion/styled'

import { required,  minBRPhoneNumberLength, minCpfLength } from './validation'
import { InputsContainer } from './form.styles'
import {  genderOptions } from '../../utils/constants'
import DatePickerComponent from '../inputs/datepicker/datepicker'
import InputComponent from '../inputs/text/InputComponent'
import SelectComponent from '../inputs/select/SelectComponent'



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