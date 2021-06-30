import React from 'react'
import { InputWrapper, FormLabel, StyledSelect } from '../input.styles'

const SelectComponent = (props) => {
  const { input, placeholder, style, ...rest } = props

  return (
    <InputWrapper style={style}>
      <FormLabel htmlFor={input.name} >{placeholder}</FormLabel>
      <StyledSelect {...input} {...rest} onBlur={() => input.onBlur(input.value)} placeholder={placeholder}  />
    </InputWrapper>
  )
}

export default SelectComponent