import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { DesktopBreakpoint, PhoneBreakpoint } from '../responsive/devices'

const CarouselLandscapeContainer = styled('div')`
    align-items: center;
    background-color: rgba(0,0,0, 0.4);
    column-gap: 1vw;
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;
    height: 55vh;
    justify-content: center;
    padding: 1vh 1vw;
`

const CarouselPortraitContainer = styled('div')`
  align-items: center;
  background-color: lightgoldenrodyellow;
  column-gap: 1vw;
  display: grid;
  grid-template-columns: 42vw 42vw;
  height: 40vh;
  justify-content: center;
  padding: 1vh 1vw;
`

const LandingCarousel = (props) => {
    const data = useStaticQuery(graphql`
    query {
      frete: file(relativePath: { eq: "test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      entrega: file(relativePath: { eq: "test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      protecao: file(relativePath: { eq: "test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pgto: file(relativePath: { eq: "test.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const ImagesArray = [
      {
          name: 'Frete Grátis',
          image: data.frete.childImageSharp.fluid
      },
      {
        name: 'Entrega',
        image: data.entrega.childImageSharp.fluid
      },
      {
          name: 'Proteção',
          image: data.protecao.childImageSharp.fluid
      },
      {
          name: 'Pagamento',
          image: data.pgto.childImageSharp.fluid
      }
  ]
    return(
      <>
        <DesktopBreakpoint>
          <CarouselLandscapeContainer>
            {ImagesArray.map(item => (
                <Img
                    style={{
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%'
                    }}
                    alt={item.name}
                    key={item.name}
                    fluid={item.image}
                />
            ))}
          </CarouselLandscapeContainer>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
          <CarouselPortraitContainer>
            {ImagesArray.map(item => (
                <Img
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%'
                    }}
                    alt={item.name}
                    key={item.name}
                    fluid={item.image}
                />
            ))}
            </CarouselPortraitContainer>
        </PhoneBreakpoint>
      </>

    )
}

export default LandingCarousel