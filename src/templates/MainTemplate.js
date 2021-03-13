import React from "react"
import { useSelector } from 'react-redux'


import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingCarousel from "../components/carousel"
import StoreContainer from '../containers/Store'
import MenuComponent from '../components/menu/menuItems'

const IndexPage = ({ pageContext: { productData } }) => {
  const { items, isFetching } = useSelector(state => state.products)
  const itemsData = items.length ? items : productData
  return (
  <Layout>
    <SEO
      title="Home"
    />
    <LandingCarousel />
    <MenuComponent />
    <StoreContainer
      isFetching={isFetching}
      products={itemsData}
    />
  </Layout>
)}

export default IndexPage
