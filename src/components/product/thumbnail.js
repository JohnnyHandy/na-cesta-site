import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { PhoneBreakpoint, DesktopBreakpoint } from '../responsive/devices'

const CartButtonLandscape = styled('button')`
    color: #DE6E52;
    cursor: pointer;
    font-family: Quicksand;
    font-size: 1vw;
    margin: 1vh auto ;
    width: 12vw;
`
const BuyNowButtonLandscape = styled('button') `
    color: #1A4350;
    cursor: pointer;
    font-family: Quicksand;
    margin: 1vh auto ;
    width: 12vw;
`
const BuyNowButtonPortrait = styled('button')`
    color: #1A4350;
    cursor: pointer;
    font-family: Quicksand;
    margin: 1vh auto;
    width: 25vw;
}
`

const CartButtonPortrait = styled('button')`
    color: #DE6E52;
    cursor: pointer;
    font-family: Quicksand;
    font-size: 4vw;
    margin: 1vh auto;
    width: 25vw;
`

const ProductThumb = ({ name, price, img }) => {
    return (
        <div
            style={{
                display: '-webkit-flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F3ECEC',
                padding: '3vh 1vw',
                justifyContent: 'space-evenly'
            }}
        >
            <Img
                fluid={img}
                alt={name}
                style={{
                    width: '150px',
                    height: '150px'
                }}
            />
            <span> {name} </span>
            <span> {price} </span>
            <DesktopBreakpoint>
                <BuyNowButtonLandscape>
                    Comprar agora
                </BuyNowButtonLandscape>
                <CartButtonLandscape>
                    Adicionar à sacola
                </CartButtonLandscape>
            </DesktopBreakpoint>
            <PhoneBreakpoint>
                <BuyNowButtonPortrait>
                    Comprar agora
                </BuyNowButtonPortrait>
                <CartButtonPortrait>
                    Adicionar à sacola
                </CartButtonPortrait>
            </PhoneBreakpoint>
        </div>
    )
}

export default ProductThumb