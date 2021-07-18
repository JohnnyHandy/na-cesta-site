import React from 'react'

import { spanCss, spanTitleCss, Button } from '../../containers/User/UserContainer.styles'

const BoletoInfo = ({user, address, onSubmit}) => {
  return (
    <div
      style={{
        display: 'grid'
      }}
    >
      <span css={spanTitleCss}>Informações do boleto</span> 
      <span css={spanCss}>Nome: {user.name}</span>
      <span css={spanCss}>Email: {user.email}</span>
      <span css={spanCss}>CPF: {user.document}</span>
      <span css={spanCss}>Endereço: {`${address.street} - ${address.number} ${address?.complement}`}</span>
      <span css={spanCss}>Cidade: {address.city}</span>
      <span css={spanCss}>Estado: {address.state}</span>
      <span css={spanCss}>CEP: {address.cep}</span>
      <span css={spanCss}>País:Brasil </span>
      <button onClick={() => onSubmit()} css={Button} > Pagar com boleto </button>
    </div>
  )
}

export default BoletoInfo