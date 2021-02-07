import React from 'react'
import styled from '@emotion/styled'

import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'
import Products from '../Products'
import Filters from '../Filters'


const StoreLandscapeContainer = styled('div')`
    display: grid;
    grid-template-columns: 30% 70%;
    justify-content: space-evenly;
    padding: 3vh 0;
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
                <Products {...props} />
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