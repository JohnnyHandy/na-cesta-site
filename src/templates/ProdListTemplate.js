import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import StoreContainer from '../containers/Store'

const ProdListTemplate = ({ pageContext: { products, title } }) => {
  return (
    <Layout>
        <SEO title={title} />
        <MenuComponent />
        <StoreContainer products={products.map(item => item.node)} />
    </Layout>
  )
}

export default ProdListTemplate