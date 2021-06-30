import React from 'react'
import InputMask from 'react-input-mask'


import { InputWrapper, FormLabel, ErrorSpan } from '../input.styles'

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

export default InputComponent