import React from "react"
import { getImage } from 'gatsby-plugin-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'
import MenuComponent from '../components/menu/menuItems'

const IndexPage = ({ pageContext: { product, model } }) => {
  console.log('product', product)
  const formattedProducts = {
    ...product,
    images: product.imageArray.map(image => {
      const imageData = getImage(image)
      const filename = product.images.find(imageItem => imageData.images.fallback.src.includes(imageItem.filename)).filename
      return({
        image: imageData,
        filename
      })
    })
  }
  return (
  <Layout>
      <SEO title={product.name} />
      <MenuComponent />
      <ProductUnit product={formattedProducts} model={model} />
  </Layout>
)}

export default IndexPage
