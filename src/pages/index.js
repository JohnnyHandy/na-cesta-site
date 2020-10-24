import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LandingCarousel from "../components/carousel"
import StoreContainer from '../containers/Store'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <LandingCarousel />
    <StoreContainer />
  </Layout>
)

export default IndexPage
