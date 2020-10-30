import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

import { DesktopBreakpoint, PhoneBreakpoint } from '../responsive/devices'

const ForwardArrow = ({ onClick, className }) => {
    return (
        <BiRightArrow
            color='#DE6E52'
            description='Próximo'
            className={className}
            onClick={onClick}
        />
    )
}

const PrevArrow = ({ onClick, className }) => {
    return (
        <BiLeftArrow
            color='#DE6E52'
            description='Anterior'
            className={className}
            onClick={onClick}
        />
    )
}

const CarouselLandscapeContainer = styled('div')`
    align-items: center;
    background-color: lightgoldenrodyellow;
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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <ForwardArrow />
  };
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