import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import TestImg from '../../images/modelo.jpeg'
import CustomRadio from '../inputs/radio'
import { clearCart } from '../../store/cart'

const CartWrapper = styled('div')`
    font-family: Quicksand;
    min-height: 75vh;
`

const UpperWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    position: relative;
`

const CartTitleDesktop = styled('span')`
    font-size: 2em;
    font-weight: bolder;
`
const DetailSectionDesktop = styled('div')`
    align-items: flex-start;
    background: #C4C4C4;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    flex-grow: 0.8;
    padding: 1em;
`

const SummaryWrapperDesktop = styled('div')`
    background: #D0775D;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.5em 0;
    width: 25%;
`
const SummaryTitleDesktop = styled('span')`
    color: white;
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
` 

const SummarySection = styled('div')`
    align-items: center;
    background: #1A4350;
    color: white;
    display: flex;
    justify-content: center;
    padding: 0.5em 0;
    width: 100%;
`
const SummaryValueWrapper = styled('div')`
  color: white;
  display: flex;
  justify-content: space-around;
  width: 100%
`

const CalcButtonDesktop = styled('div')`
    background: #C4C4C4;
    cursor: pointer;
    margin: 0 1em;
    padding: 0.5em;
`
const ClearCartButton = styled('div')`
    background: white;
    cursor: pointer;
    margin: 0 1em;
    padding: 0.5em;
`

const CartItems = ({cartItems}) => cartItems.map(item => {
  return (
    <div
    style={{
      alignItems: 'center',
      background: '#eaeaea',
      borderBottom: '1px solid white',
      borderRadius: '1em',
      display: 'flex',
      padding: '1em'
    }}
    >
      <Img fluid={item.product.image} alt={item.product.image.src} style={{ width: '100px', height: '100px', margin: '0' }} />
      <div
        style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}> {item.product.name} </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            margin: '0 2em',
            width: '15em'
          }}
        >
          <span> Código: {item.product.code} </span>
          <span> Quantidade: {item.quantity} </span>
          <span> Tamanho: {item.size} </span>
          <span> Cor: {item.colors} </span>
        </div>
        <span> Subtotal: R${item.product.isDeal ? item.product.dealPrice : item.product.price} </span>
        </div>
      </div>
    </div>
  )
})


const CartComponent = ({ cartItems, dispatch }) => {
  console.log('cartItems', cartItems)
  return (
    <CartWrapper>
      <UpperWrapper>
        <DetailSectionDesktop>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <CartTitleDesktop> Sacola </CartTitleDesktop>
            <ClearCartButton onClick={() => dispatch(clearCart())} > Limpar sacola </ClearCartButton>
          </div>
          <div 
            style={{ width: '100%', margin: '1em 0' }}>
              <CartItems cartItems={cartItems} />
          </div>
          <div
            style={{ width: '100%',  margin: '1em 0' }}
          >
            <CartTitleDesktop> Entrega </CartTitleDesktop>
            <div
              style={{
                padding: '1em 0'
              }}
            >
              <CustomRadio label={'Opção 1'} />
              <CustomRadio label={'Opção 2'} />
            </div>
          </div>
        </DetailSectionDesktop>
        <SummaryWrapperDesktop>
          <SummaryTitleDesktop> Calcular frete e prazo </SummaryTitleDesktop>
          <SummarySection>
            <input />
            <CalcButtonDesktop> Calcular </CalcButtonDesktop>
          </SummarySection>
          <SummaryTitleDesktop> Cupom de desconto </SummaryTitleDesktop>
          <SummarySection>
            <input />
            <CalcButtonDesktop> Aplicar </CalcButtonDesktop>
          </SummarySection>
          <SummaryTitleDesktop> Resumo do pedido </SummaryTitleDesktop>
          <SummarySection style={{ flexDirection: 'column' }}>
            <SummaryValueWrapper>
              <span> Subtotal </span>
              <span> R$100,00 </span>
            </SummaryValueWrapper>
            <SummaryValueWrapper>
              <span> Desconto </span>
              <span> R$0,00 </span>
            </SummaryValueWrapper>
            <SummaryValueWrapper>
              <span>Entrega</span>
              <span>R$0,00</span>
            </SummaryValueWrapper>
            <SummaryValueWrapper style={{ fontWeight: 'bolder' }}>
              <span> Total </span>
              <span> R$100,00 </span>
            </SummaryValueWrapper>
            <CalcButtonDesktop> Finalizar compra </CalcButtonDesktop>
          </SummarySection>
        </SummaryWrapperDesktop>
      </UpperWrapper>
    </CartWrapper>
  )
}

export default CartComponent