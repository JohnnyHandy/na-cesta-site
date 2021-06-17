import React from 'react'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'
import { useDispatch } from 'react-redux'
import { DesktopBreakpoint, PhoneBreakpoint } from '../../components/responsive/devices'

import KeenSlider from '../../components/slider/keen'
import { addToCart } from '../../store/cart'

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
                            <img
                                src={image.url}
                                alt={image.filename}
                                style={{
                                    height: '75px',
                                    width: '75px'
                                }}
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
                                    <img
                                        src={image.url}
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
                        <img
                            src={image.url}
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
                <img src={item.images[0]['url']} style={{ width: '100%' }} />
            </ColorSquare>
        )
    }
})

const ProductUnit = (props) => {
    const dispatch = useDispatch()
    const { product, productIndex, model } = props
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
        code: product.ProductId,
        price: product.price,
        dealPrice: product.dealPrice,
        isDeal: product.isDeal
      }
      dispatch(addToCart(newCartItem))
  }
    return(
        <>
        <DesktopBreakpoint>
            <ProductUnitWrapper>
                <UpperWrapper>
                <ProductTitleDesktop> {product.name} </ProductTitleDesktop>
                    <ImagesSectionDesktop>
                        <ImagesSlider
                            images={product.images}
                            setImageIndex={setImageIndex}
                            SlideRef={SlideRef}
                        />
                        <img
                            src={product.images[selectedImageIndex]['url']}
                            alt={product.images[selectedImageIndex]['filename']}
                            style={{ width: '400px', height: '400px' }}
                        />
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
                <DescriptionWrapper>
                    {product.description}
                </DescriptionWrapper>
            </ProductUnitWrapper>
        </DesktopBreakpoint>
        <PhoneBreakpoint>
            <ProductUnitWrapper>
                <ProductTitleMobile> {product.name} </ProductTitleMobile>
                <ImageSectionMobile>
                        <img
                            src={product.images[selectedImageIndex]['url']}
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
