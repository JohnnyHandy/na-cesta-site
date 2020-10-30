import React from 'react'
import styled from '@emotion/styled'
import { FaUserCircle } from 'react-icons/fa'

const AnchorItem = styled('a')`
  color: black;
  text-decoration: underline;
`
const MenuContainer = styled('div')`
    display: -webkit-flex;
    font-family: Quicksand;
    justify-content: space-evenly;
    padding: 1vh 1vw;
    width: 65vw;
`

const MenuItems = () => [
    {
        href: '/',
        description: 'Quem Somos',
        icon: null,
        iconProps: {},
        style: {}
    },
    {
        href: '/',
        description: 'Contato',
        icon: null,
        iconProps: {},
        style: {}
    },
    {
        href: '/',
        description: 'Trocas e devoluções',
        icon: null,
        iconProps: {},
        style: {}
    },
    {
        href: '/',
        description: 'Entrar / Registrar',
        icon: FaUserCircle,
        iconProps: {
        size: '2vw'
        },
        style: {
            display: 'flex',
            alignItems: 'center',
            width: '15vw',
            justifyContent: 'space-evenly'
        }
    }
    ].map(item =>(
    <AnchorItem
        href={item.href}
        style={item.style}
    >
        {item.description} {item.icon && React.createElement(item.icon, {...item.iconProps})}
    </AnchorItem>
))

const Menu = () => {
    return (
        <MenuContainer>
            <MenuItems />
        </MenuContainer>
    )
}
    
export default Menu