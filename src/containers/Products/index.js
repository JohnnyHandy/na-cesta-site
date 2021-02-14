import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import { PhoneBreakpoint, DesktopBreakpoint } from '../../components/responsive/devices'
import Thumbnail from '../../components/product/thumbnail'
import Filters from '../Filters'

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
  const { products } = props
  const data = useStaticQuery(graphql`
  {
    allProduct {
    nodes {
      imageArray {
        childImageSharp {
          fluid(maxWidth: 150, maxHeight: 150) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}`)
  const ProductItems = ({items}) => items.map((item, index) => {
    console.log('data',data, 'item', item, 'index', index )
    const ThumbImg = data['allProduct']['nodes'][index]['imageArray'][0]['childImageSharp']['fluid']
    console.log('test', data['allProduct']['nodes'][index]['imageArray'])
    return (
      <Thumbnail
        key={item.name}
        name={item.name}
        price={item.price}
        productId={item.ProductId}
        img={ThumbImg}
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