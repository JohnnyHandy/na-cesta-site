import React from 'react'
import styled from '@emotion/styled'
import { FaUserCircle } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'

import { PhoneBreakpoint, DesktopBreakpoint } from '../responsive/devices'

const AnchorItem = styled('a')`
  color: black;
  text-decoration: underline;
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

const MenuItems = ({ isPortrait }) => {
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
        ...loginStyleProps
    }
    ].map(item =>(
        <>
        <DesktopBreakpoint>
            <AnchorItem
                href={item.href}
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
        </>
))}

const Menu = ({setMenu, menu}) => {
    const MenuRef = React.useRef()
    useOutsideAlerter(MenuRef)
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    function useOutsideAlerter (ref) {
        React.useEffect(() => {
            function handleClickOutside (event) {
              if (ref.current && !ref.current.contains(event.target) && menu) {
                setMenu(!menu)
              }
            }
      
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
              document.removeEventListener('mousedown', handleClickOutside)
            }
          }, [ref])    
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
                <MenuItems />
            </MenuLandscapeContainer>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
        <Helmet>
            <html style='overflow: hidden;' />
        </Helmet>
            <Backdrop>
            <MenuPortraitContainer ref={MenuRef}>
                <MenuItems isPortrait={isPortrait} />
            </MenuPortraitContainer>
            </Backdrop>
        </PhoneBreakpoint>
        </>
    )
}
    
export default Menu