import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
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

const ProductThumb = ({ name, price, img, path, is_deal, deal_price }) => {
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
            key={name}
        >
            <Link
                to={path}
            >
                <GatsbyImage
                    image={img}
                    alt={name}
                    style={{
                        width: '150px',
                        height: '150px'
                    }}
                />
            </Link>
            <span> {name} </span>
                <span
                    style={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                >
                     <span
                        style={{
                            color: is_deal ? '#8a8080' : '',
                            textDecoration: is_deal ? 'line-through' : ''
                        }}
                        >R$ {' '} {price}
                    </span>
                     {is_deal && <span>R$ {' '} {deal_price} </span>}
                 </span>
            <DesktopBreakpoint>
                <Link
                    to={path}
                >
                    <BuyNowButtonLandscape>
                        Detalhes
                    </BuyNowButtonLandscape>
                </Link>
                {/* <CartButtonLandscape>
                    Adicionar à sacola
                </CartButtonLandscape> */}
            </DesktopBreakpoint>
            <PhoneBreakpoint>
                <Link
                    to={path}
                >
                    <BuyNowButtonPortrait>
                        Detalhes
                    </BuyNowButtonPortrait>
                </Link>
                {/* <CartButtonPortrait>
                    Adicionar à sacola
                </CartButtonPortrait> */}
            </PhoneBreakpoint>
        </div>
    )
}

export default ProductThumb