import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'
import MenuComponent from '../components/menu/menuItems'

export const query = graphql`
  query ($productNodeId: String, $modelNodeId: String) {
    allProduct(filter: {id:{eq: $productNodeId}}) {
      edges {
        node{
          id
          name
          ref
          price
          description
          color
          deal_price
          is_deal
          discount
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
          model_id
          stocks { size, id, quantity }
          created_at
          updated_at
        }
      }
    }
    allModel(filter: {id:{eq:$modelNodeId }}){
      edges {
        node{
          id
          name
          ref
          price
          deal_price
          description
          is_deal
          discount
          description
          category_id,
          modelId
        }
      }
    }
  }
`

const IndexPage = ({ pageContext: { product, model, productNodeId, modelNodeId }, data }) => {
  console.log('data', data)
  console.log('productNodeId', productNodeId, 'modelNodeId', modelNodeId)
  const formattedProducts = {
    ...product,
    images: product.imageArray.map(image => {
      const imageData = getImage(image)
      const filename = product.images.find(imageItem => {
        return (imageData.images.fallback.src.includes(imageItem.filename)
        || imageData.images.fallback.src.includes(encodeURI(imageItem.filename))
        || imageData.images.fallback.src.includes(encodeURI(encodeURI(imageItem.filename)))
        )
      }).filename
      return({
        image: imageData,
        filename
      })
    }),
    description: product.description || model.description,
    price: product.price || model.price,
    discount: product.discount || model.discount,
    deal_price: product.deal_price || model.deal_price,
    is_deal: product.is_deal || model.is_deal,
  }
  return (
  <Layout>
      <SEO title={product.name} />
      <MenuComponent />
      <ProductUnit product={formattedProducts} model={model} />
  </Layout>
)}

export default IndexPage
