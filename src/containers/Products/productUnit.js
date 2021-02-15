import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'

import Slider from '../../components/slider'

import { colorPallete } from '../../utils/colors'

const ProductUnitWrapper = styled('div')`
    font-family: Quicksand;
    min-height: 75vh;
`

const UpperWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    position: relative;
`
const ProductTitleDesktop = styled('span')`
    font-size: 1.5em;
    left: 6em;
    position: absolute;
`

const ProductTitleMobile = styled('span')`
    font-size: 1.5em;
    margin: 0 auto;
`

const ImagesSectionDesktop = styled('div')`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 3em;
    width: 50%;
`

const ImageSectionMobile = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const ImageSliderContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    width: 30%;
`

const DetailsWrapperDesktop = styled('div')`
    background: #D0775D;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.5em 0;
    width: 25%;
`

const DetailsWrapperMobile = styled('div')`
    background: #D0775D;
    padding: 1em 0;
`

const DetailsTitleDesktop = styled('span')`
    color: white;
    font-size: 2em;
    font-weight: bold;
    padding: 0.2em;
` 
const DetailsTitleMobile = styled('span')`
    color: white;
    font-size: 1.2em;
    font-weight: bold;
    padding: 0 0.5em;
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
const BuyButtonDesktop = styled('div')`
    background: #C4C4C4;
    cursor: pointer;
    margin: 0 1em;
    padding: 0.5em;
`

const BuyButtonMobile = styled('div')`
    background: #C4C4C4;
    margin: 0 1em;
    padding: 0.5em;
    text-align: center;
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
        <>
        <DesktopBreakpoint>
            <ProductUnitWrapper>
                <UpperWrapper>
                <ProductTitleDesktop> {product.name} </ProductTitleDesktop>
                    <ImagesSectionDesktop>
                        <ImagesSlider images={imagesArray} setImageIndex={setImageIndex} SlideRef={SlideRef} />
                        <Img
                            fluid={imagesArray[selectedImageIndex]['childImageSharp']['fluid']}
                            alt={imagesArray[selectedImageIndex]['childImageSharp']['fluid']['src']}
                            style={{ width: '400px', height: '400px' }}
                        />
                    </ImagesSectionDesktop>
                    <DetailsWrapperDesktop>
                        <DetailsTitleDesktop>
                            Tamanhos
                        </DetailsTitleDesktop>
                        <DetailSection>
                            <SizeOptions
                                sizeSelected={sizeSelected}
                                setColorIndex={setColorIndex}
                                setSize={setSize}
                                details={product.details}
                            />  
                        </DetailSection>
                        <DetailsTitleDesktop>
                            Cores
                        </DetailsTitleDesktop>
                        <DetailSection>
                            <ColorOptions
                                colors={product['details'][sizeSelected]['colors']}
                                setColorIndex={setColorIndex}
                                selectedColor={selectedColor}
                            />
                        </DetailSection>
                        <DetailsTitleDesktop>
                            Quantidade
                        </DetailsTitleDesktop>
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
                            <BuyButtonDesktop>
                                Comprar Agora
                            </BuyButtonDesktop>
                            <BuyButtonDesktop>
                                Adicionar à sacola
                            </BuyButtonDesktop>
                        </DetailSection>
                    </DetailsWrapperDesktop>
                </UpperWrapper>
                <DescriptionWrapper>
                    {product.description}
                </DescriptionWrapper>
            </ProductUnitWrapper>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <ProductUnitWrapper>
                <ProductTitleMobile> {product.name} </ProductTitleMobile>
                <ImageSectionMobile>
                        <Img
                            fluid={imagesArray[selectedImageIndex]['childImageSharp']['fluid']}
                            alt={imagesArray[selectedImageIndex]['childImageSharp']['fluid']['src']}
                            style={{ width: '200px', height: '200px' }}
                        />
                        <ImagesSlider images={imagesArray} setImageIndex={setImageIndex} SlideRef={SlideRef} />
                </ImageSectionMobile>
                <DetailsWrapperMobile>
                    <DetailsTitleMobile>
                        Tamanhos
                    </DetailsTitleMobile>
                    <DetailSection>
                        <SizeOptions
                            sizeSelected={sizeSelected}
                            setColorIndex={setColorIndex}
                            setSize={setSize}
                            details={product.details}
                        />  
                    </DetailSection>
                    <DetailsTitleMobile>
                        Cores
                    </DetailsTitleMobile>
                    <DetailSection>
                        <ColorOptions
                            colors={product['details'][sizeSelected]['colors']}
                            setColorIndex={setColorIndex}
                            selectedColor={selectedColor}
                        />
                    </DetailSection>
                    <DetailsTitleMobile>
                        Quantidade
                    </DetailsTitleMobile>
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
                        <BuyButtonMobile>
                            Comprar Agora
                        </BuyButtonMobile>
                        <BuyButtonMobile>
                            Adicionar à sacola
                        </BuyButtonMobile>
                    </DetailSection>
                </DetailsWrapperMobile>
                <DescriptionWrapper>
                    {product.description}
                </DescriptionWrapper>
            </ProductUnitWrapper>
        </PhoneBreakpoint>
        </>
    )
}

export default ProductUnit
