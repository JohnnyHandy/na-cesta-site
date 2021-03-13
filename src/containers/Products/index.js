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
  const data = useStaticQuery(graphql`
  {
    allProduct {
    nodes {
      imageArray {
        url
        childImageSharp {
          fluid(maxWidth: 150, maxHeight: 150) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}`)
  if(isFetching) {
    return <LoadingComponent />
  }
  const ProductItems = ({items}) => items.map((item, index) => {
    console.log('item', item)
    const formattedImageUrls = item.images.map(image => {
      let urlPiece = image.key ? image.key : image
      return `https://useverano.s3-sa-east-1.amazonaws.com/${urlPiece}`
    })
     const getImageArrayFromQuery = data['allProduct']['nodes'].map(queryItem => queryItem['imageArray']).find(queryItem => {
       let getArrayOfUrls = queryItem.map(i => i.url)
       return JSON.stringify(getArrayOfUrls) === JSON.stringify(formattedImageUrls)
     })
    const ThumbImg = getImageArrayFromQuery[0]['childImageSharp']['fluid']
    return (
      <Thumbnail
        key={item.name}
        name={item.name}
        price={item.price}
        productId={item.ProductId}
        img={ThumbImg}
        isDeal={item.isDeal}
        dealPrice={item.dealPrice}
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