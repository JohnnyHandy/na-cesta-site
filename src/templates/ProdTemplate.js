import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'
import MenuComponent from '../components/menu/menuItems'

const IndexPage = ({ pageContext: { product, productIndex } }) => {
  return (
  <Layout>
      <SEO title={product.name} />
      <MenuComponent />
      <ProductUnit product={product} productIndex={productIndex} />
  </Layout>
)}

export default IndexPage
