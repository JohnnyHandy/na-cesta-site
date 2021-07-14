import React from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

import { spanCss } from '../../containers/User/UserContainer.styles'
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
  console.log('product', product)
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
      <GatsbyImage
        image={product.image.image}
        alt={product.name}
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
            columnGap: '2em'
          }}
        >
          <span css={spanCss} style={{ whiteSpace: 'pre' }}> Código: {product.ref} </span>
          <span css={spanCss}> Quantidade: {product.quantity} </span>
          <span css={spanCss}> Tamanho: {product.size} </span>
          <span css={spanCss} style={{ display: 'flex', alignItems: 'center' }}>
            Cor:  <div style={{ background: product.color, width: '15px', height: '15px' }} />
          </span>
        </div>
        <span> Subtotal: R${product.subtotal} </span>
        </div>
      </div>
    </div>
  )
})


const CartComponent = ({ cartItems, dispatch }) => {
  const { id } = useSelector(state => state.auth.user)
  const subtotal = cartItems?.reduce((ac, item) => {
    return ac + item.subtotal
  }, 0)
  const deliverPrice = 0
  const discount = 0
  const total = subtotal + discount + deliverPrice
  const registerOrder = () => {
    const orderParams = {
      status: 0,
      user_id: id,
      ref: generateId(10),
      order_items_attributes: cartItems,
      coupon: 'coupon',
      discount: null
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