import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

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
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%'
        }}
        alt={'Loading...'}
        fluid={data.image.childImageSharp.fluid}
    />
  )
}

export default Loading