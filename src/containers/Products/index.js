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
  query {
    modelo: file(relativePath: { eq: "modelo.jpeg" }) {
      childImageSharp {
        fixed (width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`)
  const ProductItems = ({items}) => items.map(item => {
    return (
      <Thumbnail
        name={item.name}
        price={item.price}
        img={`https://useverano.s3-sa-east-1.amazonaws.com/${item.images[0]['key']}`}
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
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
                <Thumbnail
                  img={data.modelo.childImageSharp.fixed}
                  name={'Modelo'}
                  price={'R$ 45,00'}
                />
              </ProductsAreaPortrait>
            </PhoneBreakpoint>
        </div>
    )
}

export default Products