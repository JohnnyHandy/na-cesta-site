import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

import Slider from '../../components/slider'

import { colorPallete } from '../../utils/colors'

const UpperWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    position: relative;
`
const ProductTitle = styled('span')`
    font-size: 1.5em;
    left: 6em;
    position: absolute;
`

const ImagesSection = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    width: 50%;
`

const ImageSliderContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    width: 30%;
`

const DetailsWrapper = styled('div')`
    background: #D0775D;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.5em 0;
    width: 25%;
`

const DetailsTitle = styled('span')`
    color: white;
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
` 
const DetailSection = styled('div')`
    align-items: center;
    background: #1A4350;
    color: white;
    display: flex;
    justify-content: center;
    padding: 0.5em 0;
    width: 100%;
`
const QuantityControl = styled('span')`
    align-items: baseline;
    cursor: pointer;
    display: flex; 
    font-size: 4em;
`

const QuantityDisplay = styled('div')`
    align-items: center;
    background: white;
    color: black;
    display: flex;
    height: 2.5em;
    justify-content: center;
    margin: 0 1em;
    width: 2.5em;
`
const BuyButton = styled('div')`
    background: #C4C4C4;
    cursor: pointer;
    margin: 0 1em;
    padding: 0.5em;
`

const DescriptionWrapper = styled('div')`
    border: 1px solid;
    marginTop: 2em;
    minHeight: 5em;
`

const SizeWrapper = styled('div')`
    background: #C4C4C4;
    border: ${({ sizeSelected }) => sizeSelected ? '3px solid white' : ''};
    cursor: pointer;
    display: flex;
    font-size: 1.5em;
    height: 1.5em;
    margin: 0 0.5em;
    width: 1.5em;
`

const ColorSquare = styled('div')`
    background: ${({ colorHex }) => colorHex};
    border: ${({ selectedColor }) => selectedColor ? '3px solid white' : '1px solid white'};
    cursor: pointer;
    height: 1.5em;
    margin: 0 0.5em;
    width: 1.5em;
`


const ImagesSlider = ({ images, setImageIndex, SlideRef }) => {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }}
        console.log('images', images)
    return (
        <ImageSliderContainer>
            {images.length > 4 
            ? ( <>
                    <BiUpArrow style={{ cursor: 'pointer' }} onClick={() => SlideRef.current.slickPrev()} />
                    <Slider reference={SlideRef} settings={settings}>
                        {
                            images.map((item, index) => (
                                <div
                                style={{
                                    cursor: 'pointer',
                                    height: '100px',
                                    margin: '1em auto',
                                    width: '100px'
                                }}
                                onClick={() => setImageIndex(index)}
                                key={item['childImageSharp']['fluid']['src']}
                                >
                                <Img
                                    fluid={item['childImageSharp']['fluid']}
                                    alt={item['childImageSharp']['fluid']['src']}
                                />
                                </div>
                            ))
                        }
                    </Slider>
                    <BiDownArrow style={{ cursor: 'pointer' }} onClick={() => SlideRef.current.slickNext()} />
                </>)
        : (
            images.map((item, index) => (
                <div
                    style={{
                        cursor: 'pointer',
                        height: '100px',
                        margin: '1em auto',
                        width: '100px'
                    }}
                    onClick={() => setImageIndex(index)}
                    key={item['childImageSharp']['fluid']['src']}
                >
                    <Img
                        fluid={item['childImageSharp']['fluid']}
                        alt={item['childImageSharp']['fluid']['src']}
                    />
                </div>
            ))
        )}
        </ImageSliderContainer>
    )
}


const SizeOptions = ({details, setSize, setColorIndex, sizeSelected}) => details.map((item, index) => (
    <SizeWrapper
    key={item.size}
    onClick={() => {
        setColorIndex(0)
        setSize(index)
    }}
    sizeSelected={sizeSelected === index}
    >
        <span style={{ margin: 'auto' }}> {item.size} </span>
    </SizeWrapper>
))

const ColorOptions = ({ colors, setColorIndex, selectedColor }) => colors.map((item, index) => {
    const colorHex = colorPallete.find(colorItem => colorItem.id === item.colorId)['hex']
    return (
        <ColorSquare
            key={item.colorId}
            colorHex={colorHex}
            selectedColor = {selectedColor === index}
            onClick={() => setColorIndex(index)}
        />
    )

})

const ArrowDown = (props) => {
    const { className, style, onClick } = props
    return <BiDownArrow className={className} style={style} onClick={onClick} />
}

const ArrowUp = (props) => {
    const { className, style, onClick } = props
    return <BiUpArrow className={className} style={style} onClick={onClick} />
}

const ProductUnit = (props) => {
    const { product, productIndex } = props
    const [sizeSelected, setSize] = React.useState(0)
    const [selectedImageIndex, setImageIndex] = React.useState(0)
    const [selectedColor, setColorIndex] = React.useState(0)
    const [quantity, setQuantity] = React.useState(1)
    const SlideRef = React.useRef(null)
    const data = useStaticQuery(graphql`
    {
      allProduct {
      nodes {
        imageArray {
          childImageSharp {
            fluid(maxWidth: 500, maxHeight: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }`
  )
  console.log('slideref', SlideRef)
    const imagesArray = data['allProduct']['nodes'][productIndex]['imageArray']
    return(
        <div
            style={{
                fontFamily: 'Quicksand',
                minHeight: '75vh'
            }}
        >
            <UpperWrapper>
            <ProductTitle> {product.name} </ProductTitle>
                <ImagesSection>
                    <ImagesSlider images={imagesArray} setImageIndex={setImageIndex} SlideRef={SlideRef} />
                    <Img
                        fluid={imagesArray[selectedImageIndex]['childImageSharp']['fluid']}
                        alt={imagesArray[selectedImageIndex]['childImageSharp']['fluid']['src']}
                        style={{ width: '400px', height: '400px' }}
                    />
                </ImagesSection>
                <DetailsWrapper>
                    <DetailsTitle>
                        Tamanhos
                    </DetailsTitle>
                    <DetailSection>
                        <SizeOptions
                            sizeSelected={sizeSelected}
                            setColorIndex={setColorIndex}
                            setSize={setSize}
                            details={product.details}
                        />  
                    </DetailSection>
                    <DetailsTitle>
                        Cores
                    </DetailsTitle>
                    <DetailSection>
                        <ColorOptions
                            colors={product['details'][sizeSelected]['colors']}
                            setColorIndex={setColorIndex}
                            selectedColor={selectedColor}
                        />
                    </DetailSection>
                    <DetailsTitle>
                        Quantidade
                    </DetailsTitle>
                    <DetailSection>
                        <QuantityControl
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </QuantityControl>
                        <QuantityDisplay>
                            { quantity }
                        </QuantityDisplay>
                        <QuantityControl
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        >
                            - 
                        </QuantityControl>
                    </DetailSection>
                    <DetailSection>
                        <BuyButton>
                            Comprar Agora
                        </BuyButton>
                        <BuyButton>
                            Adicionar à sacola
                        </BuyButton>
                    </DetailSection>
                </DetailsWrapper>
            </UpperWrapper>
            <DescriptionWrapper>
                {product.description}
            </DescriptionWrapper>
        </div>
    )
}

export default ProductUnit
