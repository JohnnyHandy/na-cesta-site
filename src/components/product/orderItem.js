import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import Collapse from 'react-collapse'

import { Button, spanCss } from '../../containers/User/UserContainer.styles'

const OrderItem = ({orderItems}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
    <button
      css={Button}
      style={{ fontSize: '1em' }}
      onClick={() => setOpen(!open)}
      >
      Ver detalhes
    </button>
    <Collapse
      isOpened={open}
    >
      <div>
        {
          orderItems.map(orderItem => {
            const { name, subtotal, quantity, size, color, images } = orderItem
            return(
              <div
                key={name}
                style={{
                  alignItems: 'center',
                  display: 'grid',
                  gridTemplateColumns: '20% 80%',
                  boxShadow: 'inset 1px 1px 10px 0px rgb(0 0 0 / 75%)',
                  margin: '0 0.5em',
                  padding: '0 1em',
                }}
              >
                <div>
                {images?.length && (
                  <GatsbyImage
                    image={images[0]}
                    alt={name}
                    style={{
                        width: '100px',
                        height: '100px'
                    }}
                  />
                  )
                }
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50% 50%'
                  }}
                >
                <span css={spanCss}> {name} </span>
                <span css={spanCss}> Quantidade: {quantity} </span>
                <span css={spanCss}> Tamanho: {size} </span>
                <span css={spanCss}  style={{ display: 'flex', alignItems: 'center' }}>
                  Cor: <div style={{ background: color, width: '15px', height: '15px' }} />
                </span>
                <span css={spanCss}> Preço unitário: R$ { subtotal/quantity } </span>
                <span css={spanCss}> Subtotal: {subtotal}  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </Collapse>
  </>
  )
}

export default OrderItem