import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'

const IndexPage = ({ pageContext: { product, productIndex } }) => {
  return (
  <Layout>
      <SEO title='Produto' />
      <ProductUnit product={product} productIndex={productIndex} />
  </Layout>
)}

export default IndexPage
