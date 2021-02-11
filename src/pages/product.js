import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductUnit from '../containers/Products/productUnit'

const IndexPage = () => (
  <Layout>
      <SEO title='Produto' />
      <ProductUnit />
  </Layout>
)

export default IndexPage
