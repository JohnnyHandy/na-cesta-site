import styled from '@emotion/styled'
import Select from 'react-select'
import { colors } from '../../utils/constants'


export const ErrorSpan = styled('span')`
  color: red;
  font-size: 0.7em;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  max-width: 15em;
  margin:auto;
`
export const FormLabel = styled('label')`
    color: ${colors.veranoBlue};
    font-size: 1em;
    padding: 0.2em;
` 

export const InputWrapper = styled('div')`
  display: inline-grid;
  text-align: initial
`
export const StyledSelect = styled(Select)`
`