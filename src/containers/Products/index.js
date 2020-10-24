import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import Thumbnail from '../../components/product/thumbnail'

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

const ProductsArea = styled('div')`
display: grid;
grid-template-columns: 25% 25% 25%;
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
  

const Products = () => {
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
    return(
        <div>
            <MenuContainer>
                <MenuItems />
            </MenuContainer>
            <ProductsArea
            >
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

            </ProductsArea>
        </div>
    )
}

export default Products