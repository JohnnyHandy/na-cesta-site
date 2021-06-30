import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { InputWrapper, FormLabel, ErrorSpan } from '../input.styles'

const DatePickerComponent = (props) => {
  const {value, ...rest} = props
  return (
    <DatePicker selected={value} {...rest} />
  )
}

const DatePickerWrapper = (props)=> {
  const { input, placeholder, style, meta, ...rest } = props
  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <DatePickerComponent placeholder={placeholder} {...input} {...rest} />
      { meta && meta.error && meta.touched && meta.visited && <ErrorSpan> {meta.error} </ErrorSpan> }
    </InputWrapper>
  )
}

export default DatePickerWrapper

