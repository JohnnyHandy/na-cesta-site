import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colors } from '../../utils/constants'

export const Container = styled('div')`
  align-items: flex-start;
  display: flex;
  height: 100%;
  width: 100%;
`

export const Wrapper = styled('div')`
  align-content: flex-start;
  display: grid;
  margin: 0 auto;
  padding: 1em;
  height: 100%;
  width: 100%;
`

export const spanCss = css`
  color: ${colors.veranoBlue};
  font-size: 1em;
  margin: 0.2em 0;
  padding: 0.2em;
`

export const spanTitleCss = css`
  color: ${colors.veranoBlue};
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.5em 0;
  padding: 0.5em;
  text-align: center;
`

export const Button = css`
  background: ${colors.veranoBlue};
  border: none;
  color: white;
  cursor: pointer;
  font-family: Quicksand;
  font-size: 1.5em;
  font-weight: bold;
  margin: 1em auto;
  padding: 0.5em;
  & :hover {
    color: ${colors.veranoBlue};
    background: white
  }

`