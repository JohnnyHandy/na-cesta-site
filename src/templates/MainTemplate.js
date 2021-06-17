import React from "react"
import { useSelector } from 'react-redux'


import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingCarousel from "../components/carousel"
import StoreContainer from '../containers/Store'
import MenuComponent from '../components/menu/menuItems'

const IndexPage = ({ pageContext: { modelData } }) => {
  const { items, isFetching } = useSelector(state => state.products)
  const itemsData = items.length ? items : modelData
  console.log('itennsdata', itemsData);
  const formatShowcase = itemsData.map(model => {
    let dealProducts = []
    let notDealProducts = []
    model.products.forEach(product => {
      product.is_deal && dealProducts.push(product)
      !product.is_deal && notDealProducts.push(product)
    })
    dealProducts = dealProducts.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
    notDealProducts = notDealProducts.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
    const { name, price, discount, deal_price, is_deal, ref, images } = dealProducts.concat(notDealProducts)[0]
    return ({
      name: model.name,
      modelRef: model.ref,
      path: `${model.ref}-${model.name.replace(/\s/g, '-')}-${ref}-${name.replace(/\s/g, '-')}`,
      price: price,
      discount: discount,
      deal_price: deal_price,
      is_deal: is_deal,
      images: images
    })
  })
  return (
  <Layout>
    <SEO
      title="Home"
    />
    <LandingCarousel />
    <MenuComponent />
    <StoreContainer
      isFetching={isFetching}
      products={formatShowcase}
    />
  </Layout>
)}

export default IndexPage
