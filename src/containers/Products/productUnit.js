import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useDispatch } from 'react-redux'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'

import KeenSlider from '../../components/slider/keen'
import { addToCart } from '../../store/cart'
import { colors } from '../../utils/colors'

const ProductUnitWrapper = styled('div')`
    font-family: Quicksand;
    min-height: 75vh;
    background: rgb(222 219 219 / 90%);
    padding: 1em;

`

const UpperWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    position: relative;
`
const ProductTitleDesktop = styled('span')`
    font-size: 1.5em;
    font-weight: bold;
    left: 6em;
    margin-bottom: 1em;
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
    width: auto;
`

const ImageSectionMobile = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const ImageSliderContainerDesktop = styled('div')`
    align-items: center;
    display: grid;
    grid-column-gap: 1em;
    grid-template-columns: 50% 50%;
    grid-template-rows: 20% 20% 20% 20%;
    height: 100%;
    justify-content: center;
    justify-items: center;
    margin: 0 1em;
`

const ImageSliderContainerMobile = styled('div')`
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    margin: auto;
`

const DetailsWrapperDesktop = styled('div')`
    background: ${colors.veranoBronze};
    border: 1px solid;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.5em 0;
    width: 25%;
`

const DetailsWrapperMobile = styled('div')`
    background: ${colors.veranoBronze};
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
    background: ${colors.veranoBlue};
    color: white;
    display: flex;
    justify-content: center;
    margin: 0.5em 0;
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

const DescriptionWrapper = styled('span')`
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
const InfoSection = styled('div')`
  display: flex;
  flex-direction: column; 
`
const SliderImageCss = css`
  height: 75px;
  width: 75px;
  &:hover {
    outline: 1px solid black;
  }
`
const Badges = styled('div')`
  display:grid;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const OfferBadge = styled('span')`
  background: red;
  color: white;
  font-weight: bold;
  padding: 0.3em;
`
const DiscountBadge = styled('span')`
background: green;
color: white;
font-weight: bold;
padding: 0.3em;
`


const ImagesSlider = ({ images, setImageIndex, SlideRef }) => {

    return (
        <>
        <DesktopBreakpoint>
            <ImageSliderContainerDesktop>
                {
                    images.map((image, index) => (
                        <div
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={() => setImageIndex(index)}
                            key={image.filename}
                        >
                            <GatsbyImage

                                image={image.image}
                                alt={image.filename}
                                css={SliderImageCss}
                            />
                        </div>
                    ))
                }
            </ImageSliderContainerDesktop>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <ImageSliderContainerMobile>
                {images.length > 4 
                ? ( 
                    <KeenSlider>
                        {
                            images.map((image, index) => (
                                <div
                                    style={{
                                        margin: '0.5em 0',
                                    }}
                                    onClick={() => setImageIndex(index)}
                                    key={image.filename}
                                    className='keen-slider__slide'
                                >
                                    <GatsbyImage
                                        image={image.image}
                                        alt={image.filename}
                                        style={{
                                            height: '50px',
                                            width: '50px'
                                        }}
                                    />
                                </div>
                            ))
                        }
                    </KeenSlider>
                    
                )
            : (
                images.map((image, index) => (
                    <div
                        style={{
                            cursor: 'pointer',
                            height: '75px',
                            margin: '1em',
                            width: '75px'
                        }}
                        onClick={() => setImageIndex(index)}
                        key={image.filename}
                    >
                        <GatsbyImage
                            image={image.image}
                            alt={image.filename}
                        />
                    </div>
                ))
            )}
            </ImageSliderContainerMobile>
        </PhoneBreakpoint>
        </>
    )
}


const SizeOptions = ({sizes, setSize, sizeSelected}) => sizes.map((item, index) => (
    <SizeWrapper
    key={item.size}
    onClick={() => {
        setSize(index)
    }}
    sizeSelected={sizeSelected === index}
    >
        <span style={{ margin: 'auto' }}> {item.size} </span>
    </SizeWrapper>
))

const ColorOptions = ({ model, setColorIndex, selectedColor }) => model.products.map((item, index) => {
    const path = `/${model.ref}-${model.name.replace(/\s/g, '-')}-${item.ref}-${item.name.replace(/\s/g, '-')}`
    if(item.color !== null){
        return (
            <ColorSquare
                key={item.color}
                colorHex={item.color}
                selectedColor = {selectedColor === index}
                onClick={() => {
                    setColorIndex(index)
                    navigate(path)
                }}
            />
        )
    } else {
        return (
            <ColorSquare>
                <GatsbyImage image={item.images[0]['image']} style={{ width: '100%' }} />
            </ColorSquare>
        )
    }
})

const ProductUnit = (props) => {
    const dispatch = useDispatch()
    const { product, productIndex, model } = props
    const showPrice = ((product.is_deal
    ? product.deal_price
    : product.discount
    ? (product.price - product.price * (product.discount/100))
    : product.price) * 1).toFixed(2)
    const [sizeSelected, setSize] = React.useState(0)
    const [selectedImageIndex, setImageIndex] = React.useState(0)
    const [selectedColor, setColorIndex] = React.useState(0)
    const [quantity, setQuantity] = React.useState(1)
    const SlideRef = React.useRef(null)
    React.useEffect(() => {
        setColorIndex(model.products.findIndex(item => item.id === product.id))
    }, [])
  const AddItemToCart = () => {
      const newCartItem = {
        quantity: quantity,
        size: product['details'][sizeSelected]['size'],
        color: product['details'][sizeSelected]['colors'][selectedColor]['colorId'],
        name: product.name,
        code: product.id,
        price: product.price,
        dealPrice: product.deal_price,
        isDeal: product.is_deal
      }
      dispatch(addToCart(newCartItem))
  }
    return(
        <>
        <DesktopBreakpoint>
            <ProductUnitWrapper>
                <UpperWrapper>
                  <InfoSection>
                  <ProductTitleDesktop> {product.name} </ProductTitleDesktop>
                  <DescriptionWrapper>
                      {product.description || model.description}
                    </DescriptionWrapper>
                  </InfoSection>
                    <ImagesSectionDesktop>
                        <ImagesSlider
                            images={product.images}
                            setImageIndex={setImageIndex}
                            SlideRef={SlideRef}
                        />
                                      <div
                style={{ position: 'relative' }}
              >
                <Badges>
                {(product.is_deal || (product.discount > 0 && !product.is_deal)) && 
                <OfferBadge>
                  Oferta
                </OfferBadge>
                }
                {
                  product.discount > 0 && !product.is_deal && (
                    <DiscountBadge>
                      {product.discount}% OFF
                    </DiscountBadge>
                  )
                }
                </Badges>
                
                <GatsbyImage
                            image={product.images[selectedImageIndex]['image']}
                            alt={product.images[selectedImageIndex]['filename']}
                            style={{ width: '400px', height: '400px' }}
                        />
              </div>

                    </ImagesSectionDesktop>
                    <DetailsWrapperDesktop>
                        <DetailsTitleDesktop>
                            Cores
                        </DetailsTitleDesktop>
                        <DetailSection>
                            <ColorOptions
                                model={model}
                                setColorIndex={setColorIndex}
                                selectedColor={selectedColor}
                            />
                        </DetailSection>

                        <DetailsTitleDesktop>
                            Tamanhos
                        </DetailsTitleDesktop>
                        <DetailSection>
                            <SizeOptions
                                sizeSelected={sizeSelected}
                                setColorIndex={setColorIndex}
                                setSize={setSize}
                                sizes={product.stocks}
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
                        <DetailsTitleDesktop> Preço unitário </DetailsTitleDesktop>
                        <DetailSection>
                        <span
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        flexDirection: 'column'
                    }}
                >
                  <div
                    style={{ margin: '0.5em 0' }}
                  >
                  {(product.is_deal || product.discount > 0) && (
                     <span
                        style={{
                            color:'#8a8080',
                            textDecoration:'line-through' ,
                            margin: '0 0.5em'
                        }}
                        >R$ {' '} {product.price}
                    </span>
                  )}
                  {
                  product.discount > 0 && !product.is_deal && (
                    <DiscountBadge>
                      {product.discount}% OFF
                    </DiscountBadge>
                  )
                  }
                  </div>
                     <span style={{ fontWeight: 'bold', fontSize: '2em' }}>R$ {' '} {showPrice} </span>
                 </span>

                        </DetailSection>
                        <DetailSection>
                            <BuyButtonDesktop>
                                Comprar Agora
                            </BuyButtonDesktop>
                            <BuyButtonDesktop
                                onClick={AddItemToCart}
                            >
                                Adicionar à sacola
                            </BuyButtonDesktop>
                        </DetailSection>
                    </DetailsWrapperDesktop>
                </UpperWrapper>
            </ProductUnitWrapper>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <ProductUnitWrapper>
                <ProductTitleMobile> {product.name} </ProductTitleMobile>
                <ImageSectionMobile>
                        <GatsbyImage
                            image={product.images[selectedImageIndex]['image']}
                            alt={product.images[selectedImageIndex]['filename']}
                            style={{ width: '200px', height: '200px' }}
                        />
                        <ImagesSlider images={product.images} setImageIndex={setImageIndex} SlideRef={SlideRef} />
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
                            colors={model.products}
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
