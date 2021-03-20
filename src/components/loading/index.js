import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import './loading.css'

const Loading = () => {
  const data = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }`
  )

    return (
      <Img
        className='loader'
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          margin: 'auto'
        }}
        alt={'Loading...'}
        fluid={data.image.childImageSharp.fluid}
    />
  )
}

export default Loading