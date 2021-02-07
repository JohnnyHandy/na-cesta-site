import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductsSuccess } from '../store/products/index'

import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingCarousel from "../components/carousel"
import StoreContainer from '../containers/Store'

const IndexPage = ({ pageContext: { productData } }) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchProductsSuccess(productData))
  }, [])
  const products = useSelector(state => state.products.items)
  return (
  <Layout>
    <SEO title="Home" />
    <LandingCarousel />
    <StoreContainer products={products} />
  </Layout>
)}

export default IndexPage
