import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

import Slider from '../slider/'

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

const CarouselContainer = styled('div')`
    padding: 1vh 28vw;
    background-color: lightgoldenrodyellow;
    height: 55vh;
`

const LandingCarousel = (props) => {
    const data = useStaticQuery(graphql`
    query {
      frete: file(relativePath: { eq: "frete.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      entrega: file(relativePath: { eq: "entrega.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      protecao: file(relativePath: { eq: "protecao.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pgto: file(relativePath: { eq: "pgto.png" }) {
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
        <CarouselContainer>
            <Slider
                {...settings}
            >
                {ImagesArray.map(item => (
                    <Img
                        alt={item.name}
                        key={item.name}
                        fluid={item.image}
                    />
                ))}
            </Slider>
        </CarouselContainer>

    )
}

export default LandingCarousel