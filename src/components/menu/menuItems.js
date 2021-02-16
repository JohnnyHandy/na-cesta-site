import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const SpanItem = styled(Link)`
  font-family: Quicksand;
  color: black;
  cursor: pointer;
  font-size: 0.8em;
`


const MenuContainer = styled('div')`
    border-bottom: 1px solid #c4c4c4;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 1vh 2vw;
    width: 100%;
`


const MenuItems = () => [
  {
    description: 'Ofertas',
    path: '/produtos/ofertas',
    icon: null,
    iconProps: {},
    style: {
        textDecoration: 'underline'
    }
  },
  {
    description: 'Mais vendidos',
    path: '/produtos/mais-vendidos',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Biquinis',
    path: '/produtos/biquinis',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Maiôs',
    path: '/produtos/maios',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Saídas',
    path: '/produtos/saidas',
    icon: null,
    iconProps: {},
    style: {}
  }
].map(item =>(
  <SpanItem
    to={item.path}
    key={item.description}
    style={item.style}
  >
    {item.description}
  </SpanItem>
))



export default () => (
  <MenuContainer>
    <MenuItems />
  </MenuContainer>
)

