import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import { PhoneBreakpoint, DesktopBreakpoint } from '../../components/responsive/devices'
import Thumbnail from '../../components/product/thumbnail'
import Filters from '../Filters'
import LoadingComponent from '../../components/loading'

const ProductsAreaLandscape = styled('div')`
  display: grid;
  grid-template-columns: 25% 25% 25%;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  row-gap: 5vh;
`

const ProductsAreaPortrait = styled('div')`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  row-gap: 5vh;
`

const Products = (props) => {
  const { products, isFetching } = props
  if(isFetching) {
    return (
      <div
        style={{
          display: 'flex'
        }}
      >
        <LoadingComponent />
      </div>
    )
  }
  console.log('products', products);
  const ProductItems = ({items}) => items.map((product, index) => {

    return (
      <Thumbnail
        key={product.name}
        name={product.name}
        price={product.price}
        path={product.path}
        img={product.images[0]['url']}
        isDeal={product.isDeal}
        dealPrice={product.deal_price}
      />
    )
  })
    return(
        <div
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingTop: '2em' }}
        >
            <PhoneBreakpoint>
              <Filters />
            </PhoneBreakpoint>
            <DesktopBreakpoint>
              <ProductsAreaLandscape>
               <ProductItems items={products} />
              </ProductsAreaLandscape>
            </DesktopBreakpoint>
            <PhoneBreakpoint>
              <ProductsAreaPortrait>
                <ProductItems items={products} />
              </ProductsAreaPortrait>
            </PhoneBreakpoint>
        </div>
    )
}

export default Products