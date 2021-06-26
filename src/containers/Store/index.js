import React from 'react'
import styled from '@emotion/styled'
import { StaticImage } from 'gatsby-plugin-image'

import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'
import Products from '../Products'
import Filters from '../Filters'
import MenuComponent from '../../components/menu/menuItems'


const StoreLandscapeContainer = styled('div')`
    display: grid;
    grid-template-columns: 10% 90%;
    justify-content: space-evenly;
    position: relative
`
const StorePortraitContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;,
    padding: 3vh 0;
`

const StoreArea = (props) => {
    return(
        <>
        <DesktopBreakpoint>
            <StoreLandscapeContainer>
                <Filters {...props} />
                <div>
                <MenuComponent />
                <Products {...props} />
                </div>
            </StoreLandscapeContainer>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <StorePortraitContainer>
                <Products {...props} />
            </StorePortraitContainer>
        </PhoneBreakpoint>
        </>
    )
}

export default StoreArea