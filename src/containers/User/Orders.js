import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useSelector } from 'react-redux'

import { Container, Wrapper, spanTitleCss, spanCss } from './UserContainer.styles' 
import UserTemplate from '../../templates/UserTemplate'
import OrderItems from '../../components/product/orderItem'
import { colors } from '../../utils/constants'

const StatusOptions = [
  {
    value: 'confirmed',
    label: 'Confirmado'
  },
  {
    value: 'processing',
    label: 'Processando'
  },
  {
    value: 'finished',
    label: 'Finalizado'
  }
]

const UserOrdersContainer = (props) => {
  const { user } = useSelector(state => state.auth)
  const productIds = user?.orders.reduce((ac, order) => {
    const orderItemsProductIds = order.order_items.map(orderItem => orderItem.product_id)
    return ac.concat(orderItemsProductIds)
  }, [])
  const productData = useStaticQuery(graphql`
  query  {
    allProduct {
      edges {
        node{
          productId
          images { id, filename, url }
          imageArray {
             childImageSharp {
                gatsbyImageData(
                 placeholder: BLURRED
                 layout: FULL_WIDTH
                ) 
             }
           }
        }
      }
    }
  }
`
).allProduct.edges.map(item => item.node).filter(item => productIds.includes(item.productId))
  return (
    <UserTemplate {...props}>
      <Container>
        <Wrapper>
        <span css={spanTitleCss} > Meus pedidos</span>
          {
          user.orders.length === 0
          ? (
            <span css={spanCss} > Não foram feitos pedidos até o momento. </span>
          )
         : (
           <div
              style={{
                maxHeight: 'max-content',
                overflow: 'auto',
                padding: '0 2em',
              }}
           >
          {
            user.orders.map(order => {
              const { status, total, created_at, order_items, address } = order
              const formattedOrderItem = order_items.reduce((ac,orderItem) => {
                const imageArray = productData.find(product => product.productId === orderItem.product_id)?.imageArray.map(image => getImage(image))
                if(imageArray !== undefined){
                  return ac.concat({
                    ...orderItem,
                    images: imageArray
                  })
                }
                return ac
              }, [])
              const createdAt = new Date(created_at)
              const year = createdAt.getFullYear();
              let month = createdAt.getMonth()+1;
              let dt = createdAt.getDate();
            
              if (dt < 10) {
                dt = '0' + dt;
              }
              if (month < 10) {
                month = '0' + month;
              }
            
              return (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50% 50%',
                    border: `1px solid ${colors.veranoBlue}`,
                    padding: '1em 0'
                  }}
                >
                  {status && (
                    <span css={spanCss} > Status: {StatusOptions.find(item => item.value === status)?.label} </span>
                  )}
                  {total && (
                    <span css={spanCss} > Valor total: R${total} </span>
                  )}
                  {created_at && (
                    <span css={spanCss} > Data do pedido: {year+'-' + month + '-'+dt} </span>
                  )}
                  {address && (
                    <span css={spanCss} style={{ gridColumn: '1/-1' }} > Endereço de entrega: { `${address?.street}, ${address?.number}, ${address?.complement}, ${address?.neighbourhood}, ${address?.city}, ${address?.state}` }  </span>
                  )}
                  <div
                    style={{
                      display: 'grid',
                      gridColumn: '1/-1',
                    }}
                  >
                    <OrderItems orderItems={formattedOrderItem} />
                  </div>
                </div>
              )
            })
          }

           </div>
        )}
        </Wrapper>
      </Container>
    </UserTemplate>
  )
}

export default UserOrdersContainer