import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import LandingCarousel from "../components/carousel"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <LandingCarousel />
  </Layout>
)

export default IndexPage
