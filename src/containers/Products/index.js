import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import { PhoneBreakpoint, DesktopBreakpoint } from '../../components/responsive/devices'
import Thumbnail from '../../components/product/thumbnail'
import Filters from '../Filters'

const SpanItem = styled('span')`
  font-family: Quicksand;
  color: black;
  cursor: pointer;
`
const MenuContainer = styled('div')`
    width: 100%;
    justify-content: space-around;
    display: flex;
    padding: 1vh 2vw;
`

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
const MenuItems = () => [
    {
      description: 'Ofertas',
      icon: null,
      iconProps: {},
      style: {
          textDecoration: 'underline'
      }
    },
    {
      description: 'Mais vendidos',
      icon: null,
      iconProps: {},
      style: {}
    },
    {
      description: 'Biquinis',
      icon: null,
      iconProps: {},
      style: {}
    },
    {
      description: 'Maiôs',
      icon: null,
      iconProps: {},
      style: {}
    },
    {
      description: 'Saídas',
      icon: null,
      iconProps: {},
      style: {}
    }
  ].map(item =>(
    <SpanItem
      key={item.description}
      style={item.style}
    >
      {item.description}
    </SpanItem>
  ))
  

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
        <div>
            <MenuContainer>
                <MenuItems />
            </MenuContainer>
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