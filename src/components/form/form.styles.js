import styled from "@emotion/styled";
import { Link } from 'gatsby'
import { colors } from '../../utils/constants'

export const InputsContainer = styled('div')`
  align-items: flex-start;
  align-content: flex-start;
  display: grid;
  padding: 1em;
`
export const FormButton = styled('button')`
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
    background: lightgray;
    color: ${colors.veranoBlue};
    cursor: not-allowed;
  };
  & :hover {
    color: ${colors.veranoBlue};
    background: white
  };
`

export const FormComponent = styled('form')`
  display: grid;
`

export const FormTitle = styled('label')`
    color: ${colors.veranoBlue};
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
`
export const LoginLink = styled(Link)`
  color: ${colors.veranoBlue};
  font-size: 1em;
  margin: 1em 0;
  display: block;
`

export const FormErrorSpan = styled('span')`
  color: red;
  font-size: 0.7em;
  font-weight: bold;
  display: block;
  word-wrap: break-word;
  white-space: normal;
  max-width: 15em;
  margin:auto;
`
export const FormSectionTitle = styled('label')`
color: ${colors.veranoBlue};
font-size: 1.5em;
padding: 0.2em;
`

export const FormContainer = styled('div')`
  display: flex;
  font-family: Quicksand;
  min-height: 70vh;
`

export const FormArea = styled('div')`
  background: #f1d6ce;
  margin: auto;
  padding: 1.5em;
  text-align: center;
`