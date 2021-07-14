import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import { PhoneBreakpoint, DesktopBreakpoint } from '../responsive/devices'
import { colors } from '../../utils/constants'


const BuyNowButtonLandscape = styled('button') `
    color: ${colors.veranoBlue};
    cursor: pointer;
    font-family: Quicksand;
    margin: 1vh auto ;
`
const BuyNowButtonPortrait = styled('button')`
    color: ${colors.veranoBlue};
    cursor: pointer;
    font-family: Quicksand;
    margin: 1vh auto;
    width: 25vw;
}
`

const Badges = styled('div')`
  display:grid;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const OfferBadge = styled('span')`
  background: red;
  color: white;
  font-weight: bold;
  padding: 0.3em;
`
const DiscountBadge = styled('span')`
background: green;
color: white;
font-weight: bold;
padding: 0.3em;
`

const ProductThumb = ({ name, price, img, path, is_deal, deal_price, showPrice, discount }) => {
    return (
        <div
            style={{
                display: '-webkit-flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F3ECEC',
                justifyContent: 'space-between',
                width: 'fit-content'
            }}
            key={name}
        >
            <Link
                to={path}
            >
              <div
                style={{ position: 'relative' }}
              >
                <Badges>
                {(is_deal || (discount > 0 && !is_deal)) && 
                <OfferBadge>
                  Oferta
                </OfferBadge>
                }
                {
                  discount > 0 && !is_deal && (
                    <DiscountBadge>
                      {discount}% OFF
                    </DiscountBadge>
                  )
                }
                </Badges>
                
              <GatsbyImage
                    image={img}
                    alt={name}
                    style={{
                        width: '250px',
                        height: '250px'
                    }}
                />
              </div>
            </Link>
            <span> {name} </span>
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                >
                     {(is_deal || discount > 0) && 
                     <span
                        style={{
                            color:'#8a8080',
                            textDecoration:'line-through' 
                        }}
                        >R$ {' '} {price}
                    </span>}
                     <span>R$ {' '} {showPrice} </span>
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