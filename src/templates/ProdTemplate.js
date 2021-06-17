import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'
import MenuComponent from '../components/menu/menuItems'

const IndexPage = ({ pageContext: { product, model } }) => {
  console.log('product', product, 'model', model)
  return (
  <Layout>
      <SEO title={product.name} />
      <MenuComponent />
      <ProductUnit product={product} model={model} />
  </Layout>
)}

export default IndexPage
