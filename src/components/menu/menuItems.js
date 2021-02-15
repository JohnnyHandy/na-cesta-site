import React from 'react'
import styled from '@emotion/styled'

const SpanItem = styled('span')`
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
    icon: null,
    iconProps: {},
    style: {
        textDecoration: 'underline'
    }
  },
  {
    description: 'Mais vendidos',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Biquinis',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Maiôs',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    description: 'Saídas',
    icon: null,
    iconProps: {},
    style: {}
  }
].map(item =>(
  <SpanItem
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

