import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa'

import { spanCss, Button } from '../../containers/User/UserContainer.styles'
import { clearCart, updateCart } from '../../store/cart'
import { generateId } from '../../utils/functions'
import { colors } from '../../utils/constants'

import Checkout from '../checkout/checkout'
import { css } from '@emotion/core'

const CartWrapper = styled('div')`
  display: flex;
  font-family: Quicksand;
  max-height:75vh;
  min-height: 75vh;
`

const UpperWrapper = styled('div')`
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    position: relative;
`

const CartTitleDesktop = styled('span')`
    font-size: 1.5em;
    font-weight: bolder;
`
const DetailSectionDesktop = styled('div')`
    align-items: flex-start;
    background: #C4C4C4;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1em;
`

const SummaryWrapperDesktop = styled('div')`
    background: ${colors.veranoBronze};
    border: 1px solid;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    padding: 0.5em 0;
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
    margin: 0.5em 0;
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

const CartItems = ({cartItems, updateCartItems}) => cartItems.map(product => {
  return (
    <div
    key={product.name}
    style={{
      alignItems: 'center',
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
          <span css={spanCss}> Tamanho: {product.size} </span>
          <span css={spanCss} style={{ display: 'flex', alignItems: 'center' }}>
            Cor:  <div style={{ background: product.color, width: '15px', height: '15px' }} />
          </span>
          <span css={spanCss}> Preço unitário: {product.unitPrice} </span>
          <div style={{ display: 'grid' }}>
            <span css={spanCss}> Quantidade: </span>
            <div
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaRegMinusSquare onClick={() => updateCartItems(product.ref, -1)} />
                <input value={product.quantity} css={css`width: 2em`} />
              <FaRegPlusSquare onClick={() => updateCartItems(product.ref, 1)} />
            </div>
          </div>
        </div>
        <span> Subtotal: R${product.subtotal} </span>
        </div>
      </div>
    </div>
  )
})


const CartComponent = ({ cartItems, dispatch }) => {
  const updateCartItems = (ref, operand) => {
      const cartItemInfo = cartItems.find(item => item.ref === ref)
      let newCartList = cartItems
      if(cartItemInfo) {
        if(cartItemInfo.quantity + operand <= 0){
          newCartList = cartItems.filter(item => item.ref !== ref)
        } else {
          newCartList = cartItems.map(item => {
            return({
              ...item,
              quantity: item.quantity + operand,
              subtotal: item.unitPrice * (item.quantity + operand)
            })
          })
        }
      }
      dispatch(updateCart(newCartList))

  }
  const { user, isLoggedIn } = useSelector(state => state?.auth)
  const [selectedAddress, setAddress] = React.useState()
  React.useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subtotal = cartItems?.reduce((ac, item) => {
    return ac + item.subtotal
  }, 0)
  const deliverPrice = 0
  const discount = null
  const total = subtotal + discount + deliverPrice
  const orderParams = {
    status: 0,
    discount: null,
    coupon: null,
    ref: generateId(10),
    user_id: user?.id,
    address_id: selectedAddress?.id,
    order_items_attributes: cartItems.map(item => {
      const {ref, unitPrice, image, ...rest} = item
      return({...rest})
    }),
    tracking_code: null,
    total: total
  }
  const checkoutInfo = {
    amount: total.toFixed(2) * 100,
    currency: 'BRL',
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
            <div style={{ display: 'grid' }}>
              <CartTitleDesktop> Sacola </CartTitleDesktop>
              <span> Confira a lista de produtos um endereço </span>
            </div>
            <ClearCartButton onClick={() => dispatch(clearCart())} > Limpar sacola </ClearCartButton>
          </div>
          <div 
            style={{ width: '100%', background: '#eaeaea',margin: '0.5em 0', overflow: 'auto', minHeight: '50%' }}>
              <CartItems updateCartItems={updateCartItems} cartItems={cartItems} />
          </div>
          <CartTitleDesktop> Entrega </CartTitleDesktop>
          <span> Escolha um endereço </span>
          <div
            style={{ width: '100%', background: '#eaeaea',   margin: '0.5em 0', overflow: 'auto' }}
          >
              {
              user.addresses.map(address => {
                const { cep, street, number, complement, neighbourhood, city, state } = address
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '30% 30% 30%', border: `1px solid ${colors.veranoBlue}` }}>
                  {cep && (
                    <span css={spanCss} > CEP: {cep} </span>
                  )}
                  {street && (
                    <span css={spanCss} > Rua: {street} </span>
                  )}
                  {number && (
                    <span css={spanCss} > Número: {number} </span>
                  )}
                  {complement && (
                    <span css={spanCss} > Complemento: {complement} </span>
                  )}
                  {neighbourhood && (
                    <span css={spanCss} > Bairro: {neighbourhood} </span>
                  )}
                  {city && (
                    <span css={spanCss} > Cidade: {city} </span>
                  )}
                  {state && (
                    <span css={spanCss} > Estado: {state} </span>
                  )}
                  <div
                    style={{ gridColumn: '1/-1', margin: 'auto' }}
                  >
                    <button
                        css={Button}
                        style={{ fontSize: '1em', margin:'0.5em'}}
                        onClick={() => {
                          setAddress(address)
                        }}
                    >
                      Usar endereço
                    </button>
                    <button
                      css={Button}
                      style={{ fontSize: '1em', margin:'0.5em'}}
                      onClick={() => navigate('edit', {
                        state: {
                          addressId: address.id,
                          origin: 'cart'
                        }
                      })}
                    > 
                      Editar endereço
                    </button>
                  </div>
                  </div>
                )
              })
            }
          </div>
        </DetailSectionDesktop>
        <SummaryWrapperDesktop>
          <SummarySection style={{ flexDirection: 'column' }}>
          <SummaryTitleDesktop> Cupom de desconto </SummaryTitleDesktop>

            <div style={{ display: 'flex' }}>
              <input />
              <CalcButtonDesktop> Aplicar </CalcButtonDesktop>
            </div>
          </SummarySection>
          <SummarySection style={{ flexDirection: 'column' }}>
            <SummaryTitleDesktop> Resumo do pedido </SummaryTitleDesktop>
            {selectedAddress &&
            <>
              <span style={{ fontWeight: 'bold' }}> Endereço de entrega </span>
              <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', border: `1px solid ${colors.veranoBlue}` }}>
                {selectedAddress.cep && (
                  <span css={spanCss} style={{ color: 'white' }} > CEP: {selectedAddress.cep} </span>
                )}
                {selectedAddress.street && (
                  <span css={spanCss} style={{ color: 'white' }} > Rua: {selectedAddress.street} </span>
                )}
                {selectedAddress.number && (
                  <span css={spanCss} style={{ color: 'white' }} > Número: {selectedAddress.number} </span>
                )}
                {selectedAddress.complement && (
                  <span css={spanCss} style={{ color: 'white' }} > Complemento: {selectedAddress.complement} </span>
                )}
                {selectedAddress.neighbourhood && (
                  <span css={spanCss} style={{ color: 'white' }} > Bairro: {selectedAddress.neighbourhood} </span>
                )}
                {selectedAddress.city && (
                  <span css={spanCss} style={{ color: 'white' }} > Cidade: {selectedAddress.city} </span>
                )}
                {selectedAddress.state && (
                  <span css={spanCss} style={{ color: 'white' }} > Estado: {selectedAddress.state} </span>
                )}
              </div>
            </>
            }
            <span style={{ fontWeight: 'bold' }}> Valores </span>
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
              <span>Grátis</span>
            </SummaryValueWrapper>
            <SummaryValueWrapper style={{ fontWeight: 'bolder' }}>
              <span> Total </span>
              <span> R${total.toFixed(2)} </span>
            </SummaryValueWrapper>
            <CalcButtonDesktop>
              Finalizar compra
            </CalcButtonDesktop>
          </SummarySection>
        </SummaryWrapperDesktop>
        <Checkout
          checkoutInfo={checkoutInfo}
          user={user}
          address={selectedAddress}
          cartItems={cartItems}
          orderParams={orderParams}
        />
      </UpperWrapper>
    </CartWrapper>
  )
}

export default CartComponent