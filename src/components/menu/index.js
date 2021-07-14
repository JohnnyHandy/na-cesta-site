
/* eslint-disable react/style-prop-object */
import React from 'react'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'
import { FaUserCircle } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from 'react-redux'

import { PhoneBreakpoint, DesktopBreakpoint } from '../responsive/devices'
import UserDialog from './userDialog'

const AnchorItem = styled('a')`
  color: black;
  text-decoration: underline;
  cursor: pointer;
`

const AnchorItemPortrait = styled('a')`
    color: black;
    font-size: 5vw;
    margin: 1vh 1vw;
    text-decoration: underline;
`
const MenuLandscapeContainer = styled('div')`
    display: -webkit-flex;
    font-family: Quicksand;
    justify-content: space-evenly;
    padding: 1vh 1vw;
    width: 65vw;
`

const MenuPortraitContainer = styled('div')`
    background-color: white;
    display: -webkit-flex;
    flex-direction: column;
    font-family: Quicksand;
    height: 100%;
    justify-content: flex-start;
    padding: 1vh 1vw;
    width: 45vw;
`

const MenuItems = ({ isPortrait, user }) => {
    const loginStyleProps = {
        iconProps: {
            size: isPortrait ? '8vw' : '2vw'
            },
            style: {
                display: 'flex',
                alignItems: 'center',
                width: isPortrait ? '40vw' : '15vw',
                justifyContent: 'space-evenly'
            }

    }
    return [
    {
        href: '/',
        description: 'Quem Somos',
        icon: null,
        iconProps: {},
        style: {},
        enabled: true
    },
    {
        href: '/',
        description: 'Contato',
        icon: null,
        iconProps: {},
        style: {},
        enabled: true,
    },
    {
        href: '/',
        description: 'Trocas e devoluções',
        icon: null,
        iconProps: {},
        style: {},
        enabled: true
    },
    {
        href: '/login',
        description: 'Acessar conta / Registrar',
        icon: FaUserCircle,
        enabled: user === null,
        ...loginStyleProps
    },
    ].filter(item => item.enabled).map(item =>(
        <React.Fragment
            key={item.description}
        >
        <DesktopBreakpoint>
            <AnchorItem
                onClick={() => navigate(item.href)}
                style={item.style}
            >
                {item.description} {item.icon && React.createElement(item.icon, {...item.iconProps})}
            </AnchorItem>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <AnchorItemPortrait
                href={item.href}
                style={item.style}
            >
                {item.description} {item.icon && React.createElement(item.icon, {...item.iconProps})}
            </AnchorItemPortrait>
        </PhoneBreakpoint>
        </React.Fragment>
))}

const Menu = ({setMenu, menu, MenuIconRef}) => {
    const { user } = useSelector(state => state.auth)
    const MenuRef = React.useRef()
    useOutsideAlerter(MenuRef, MenuIconRef)
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    function useOutsideAlerter (ref, MenuIconRef) {
        React.useEffect(() => {
            function handleClickOutside (event) {
              if(MenuIconRef && MenuIconRef.current &&  MenuIconRef.current.contains(event.target)) {
                  return null
              }
              if (ref.current && !ref.current.contains(event.target) && menu) {
                setMenu(!menu)
              }
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
              document.removeEventListener('mousedown', handleClickOutside)
            }
          }, [ref, MenuIconRef])    
    }
  

    const Backdrop = styled('div')`
    position: fixed;
    top: ${document.getElementById('header') &&  document.getElementById('header').clientHeight};
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgb(8, 6, 16, 0.5);
`
    return (
        <>
        <DesktopBreakpoint>
            <MenuLandscapeContainer>
                <MenuItems user={user} />
                <UserDialog user={user} />
            </MenuLandscapeContainer>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
        <Helmet>
            <html lang='pt-br' style='overflow: hidden;' />
        </Helmet>
            <Backdrop>
            <MenuPortraitContainer ref={MenuRef}>
                <MenuItems user={user} isPortrait={isPortrait} />
            </MenuPortraitContainer>
            </Backdrop>
        </PhoneBreakpoint>
        </>
    )
}
    
export default Menu