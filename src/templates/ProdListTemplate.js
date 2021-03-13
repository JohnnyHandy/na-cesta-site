import React from "react"
import { useSelector } from 'react-redux'

import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import StoreContainer from '../containers/Store'

const ProdListTemplate = ({ pageContext: { products, title } }) => {
  const productsFromState = useSelector(state => state.products.items)
  const itemsData = productsFromState.length ? productsFromState : products.map(item => item.node)
  return (
    <Layout>
        <SEO title={title} />
        <MenuComponent />
        <StoreContainer products={itemsData} />
    </Layout>
  )
}

export default ProdListTemplate