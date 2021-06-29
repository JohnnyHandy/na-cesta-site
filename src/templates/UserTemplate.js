import React from 'react'
import { navigate } from 'gatsby'
import Menu, { Item as MenuItem, Divider } from 'rc-menu'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { colors } from '../utils/constants'

const StyledMenuItem = styled(MenuItem)`
  cursor: pointer;
  background: ${props => props.selected ? `${colors.veranoBlue}` : 'white'};
  color: ${props => props.selected ? 'white' : `${colors.veranoBlue}`};
  padding: 1em;
  margin: 0;
  outline: 1px solid black;
  & :hover {
    background: ${colors.veranoBlue};
    color: white;
  }
`
const StyledMenu = styled(Menu)`
  list-style: none;
  margin: 0;
  text-align: center;
  padding: 1em;
  font-size: 1.5em;
`

const UserContainerCss = css`
  display: flex;
  width: 100%;
  height: 100vh;
`

const UserWrapperCss = css`
  background: ${colors.veranoSun};
  display: flex;
  margin: auto;
  padding: 2em;

`

const UserTemplate = ({ children, ...rest }) => {
  const { location } = rest
  return (
    <div css={UserContainerCss}>
    <div
      css={UserWrapperCss}
    >
        <StyledMenu>
          <StyledMenuItem
            aria-selected={location.pathname === '/user/profile'}
            selected={location.pathname === '/user/profile'}
            onClick={() => navigate('/user/profile')}
            key="profile"
          >
            Meus dados
          </StyledMenuItem>
          <Divider />
          <StyledMenuItem
            aria-selected={location.pathname === '/user/orders'}
            selected={location.pathname === '/user/orders'}            
            onClick={() => navigate('/user/orders')}
            key="orders"
          >
              Meus Pedidos
          </StyledMenuItem>
          <Divider />
          <StyledMenuItem key="3" > Meus endereços </StyledMenuItem>
        </StyledMenu>
      <div>
        {children}
      </div>
    </div>

    </div>
  )  
}

export default UserTemplate

