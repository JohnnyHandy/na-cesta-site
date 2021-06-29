import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

import CustomRadio from '../inputs/radio'
import { clearCart, registerOrderRequest } from '../../store/cart'
import { generateId } from '../../utils/functions'
import { colors } from '../../utils/constants'

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
    background: ${colors.veranoBronze};
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
    background: ${colors.veranoBlue};
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

const CartItems = ({cartItems}) => cartItems.map(product => {
  return (
    <div
    key={product.name}
    style={{
      alignItems: 'center',
      background: '#eaeaea',
      borderBottom: '1px solid white',
      borderRadius: '1em',
      display: 'flex',
      padding: '1em'
    }}
    >
      <Img
        fluid={product.image}
        alt={product.image.src}
        style={{ width: '100px', height: '100px', margin: '0' }}
      />
      <div
        style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}> {product.name} </span>
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
          <span> Código: {product.code} </span>
          <span> Quantidade: {product.quantity} </span>
          <span> Tamanho: {product.size} </span>
          <span> Cor: {product.colors} </span>
        </div>
        <span> Subtotal: R${product.isDeal ? product.dealPrice : product.price} </span>
        </div>
      </div>
    </div>
  )
})


const CartComponent = ({ cartItems, dispatch }) => {
  const subtotal = cartItems?.reduce((ac, item) => {
    const { isDeal, dealPrice, price, quantity } = item
    const finalPrice = isDeal ? dealPrice : price
    return ac + (finalPrice * quantity)
  }, 0)
  const deliverPrice = 0
  const discount = 0
  const total = subtotal + discount + deliverPrice
  const registerOrder = () => {
    const orderParams = {
      ProductIds: cartItems.map(item => item.code),
      UserId: 'test',
      OrderId: generateId(7),
      created_at: (new Date()).toISOString(),
      orderDetails: {
        discount: 0,
        discountCode: '',
        deliverMethod: '',
        paymentMethod: '',
        deliverCost: 0,
        totalCost: total
      },
      products: cartItems.map(item => ({
        ProductId: item.code,
        color: item.color,
        dealPrice: item.dealPrice,
        isDeal: item.isDeal,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size
      })),
      totalPrice: total.toString(),
      status: '0'
    }
    dispatch(registerOrderRequest(orderParams))
  }
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
              <span> R${subtotal.toFixed(2)} </span>
            </SummaryValueWrapper>
            <SummaryValueWrapper>
              <span> Desconto </span>
              <span> R${discount} </span>
            </SummaryValueWrapper>
            <SummaryValueWrapper>
              <span>Entrega</span>
              <span>R${deliverPrice}</span>
            </SummaryValueWrapper>
            <SummaryValueWrapper style={{ fontWeight: 'bolder' }}>
              <span> Total </span>
              <span> R${total} </span>
            </SummaryValueWrapper>
            <CalcButtonDesktop
              onClick={registerOrder}
            >
              Finalizar compra
            </CalcButtonDesktop>
          </SummarySection>
        </SummaryWrapperDesktop>
      </UpperWrapper>
    </CartWrapper>
  )
}

export default CartComponent