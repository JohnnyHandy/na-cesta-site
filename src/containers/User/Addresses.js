import React from 'react'
import { useSelector } from 'react-redux'


import UserTemplate from '../../templates/UserTemplate'
import { Container, Wrapper, spanTitleCss, spanCss, Button } from './UserContainer.styles'
import { colors } from '../../utils/constants'
import { navigate } from 'gatsby'


const AddressesContainer = (props) => {
  const { user } = useSelector(state => state.auth)
  return (
    <UserTemplate {...props}>
     <Container>
        <Wrapper>
          <span css={spanTitleCss} > Meus endereços </span>
          {
          user.addresses.length === 0
          ? (
            <span css={spanCss} > Não há endereços cadastrados </span>
          )
         : (
           <div
              style={{
                maxHeight: '80%',
                overflow: 'auto',
                padding: '0 2em',
              }}
           >
            {
              user.addresses.map(address => {
                const { cep, street, number, complement, neighbourhood, city, state } = address
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', border: `1px solid ${colors.veranoBlue}` }}>
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
                    <button
                      css={Button}
                      style={{ fontSize: '1em', gridColumn: '1/-1' }}
                      onClick={() => navigate('edit', {
                        state: {
                          addressId: address.id
                        }
                      })}
                    > 
                      Editar endereço
                    </button>
                  </div>
                )
              })
            }

           </div>
          )}
          <button
            css={Button}
            onClick={() => navigate('create')}
          >
            Adicionar endereço
          </button>
        </Wrapper>
      </Container>
    </UserTemplate>
  )
}

export default AddressesContainer