import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

const CartButton = styled('button')`
    color: #DE6E52;
    cursor: pointer;
    font-family: Quicksand;
    font-size: 1vw;
    margin: 1vh auto ;
    width: 12vw;
`
const BuyNowButton = styled('button') `
    color: #1A4350;
    cursor: pointer;
    font-family: Quicksand;
    margin: 1vh auto ;
    width: 12vw;
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
            <BuyNowButton>
                Comprar agora
            </BuyNowButton>
            <CartButton>
                Adicionar à sacola
            </CartButton>
        </div>
    )
}

export default ProductThumb