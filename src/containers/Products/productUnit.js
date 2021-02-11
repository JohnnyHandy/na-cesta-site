import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import { colorPallete } from '../../utils/colors'

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

const ImagesSlider = ({ images, setImageIndex }) => images.map((item, index) => (
    <div
        style={{
            border: '1px solid',
            cursor: 'pointer',
            height: '6em',
            margin: 'auto',
            width: '6em'
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
    console.log('selectedColor', selectedColor, 'index', index)
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
    console.log('product', product)
    const imagesArray = data['allProduct']['nodes'][productIndex]['imageArray']
    return(
        <div
            style={{
                fontFamily: 'Quicksand',
                minHeight: '75vh'
            }}
        >
            <div
               style={{
                   display: 'flex',
                   justifyContent: 'space-around'
               }} 
            >
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '50%'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '30em',
                            margin: 'auto',
                            width: '30%'
                        }}
                    >
                        <ImagesSlider
                            images={imagesArray}
                            setImageIndex={setImageIndex}
                        />
                    </div>
                    <Img
                        fluid={imagesArray[selectedImageIndex]['childImageSharp']['fluid']}
                        alt={imagesArray[selectedImageIndex]['childImageSharp']['fluid']['src']}
                        style={{ width: '400px', height: '400px' }}
                    />
                </div>
                <div
                    style={{
                        background: '#D0775D',
                        border: '1px solid',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        padding: '0.5em 0',
                        width: '25%'
                    }}
                >
                    <span
                        style={{ color: 'white', fontSize: '2em' ,fontWeight: 'bold', padding: '0.2em' }}
                    >
                        Tamanhos
                    </span>
                    <div
                        style={{
                            alignItems: 'center',
                            background: '#1A4350',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0.5em 0',
                            width: '100%'
                        }}
                    >
                        <SizeOptions
                            sizeSelected={sizeSelected}
                            setColorIndex={setColorIndex}
                            setSize={setSize}
                            details={product.details}
                        />  
                    </div>
                    <span
                        style={{ color: 'white', fontSize: '2em' ,fontWeight: 'bold', padding: '0.2em' }}
                    >
                        Cores
                    </span>
                    <div
                        style={{
                            alignItems: 'center',
                            background: '#1A4350',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0.5em 0',
                            width: '100%'
                        }}
                    >
                        <ColorOptions
                            colors={product['details'][sizeSelected]['colors']}
                            setColorIndex={setColorIndex}
                            selectedColor={selectedColor}
                        />
                    </div>
                    <span
                        style={{ color: 'white', fontSize: '2em' ,fontWeight: 'bold', padding: '0.2em' }}
                    >
                        Quantidade
                    </span>
                    <div
                        style={{
                            alignItems: 'center',
                            background: '#1A4350',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0.5em 0',
                            width: '100%'
                        }}
                    >
                        <span
                            style={{ alignItems: 'baseline', cursor: 'pointer', display: 'flex', fontSize: '4em' }}
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            +
                        </span>
                        <div
                            style={{
                                alignItems: 'center',
                                background: 'white',
                                color: 'black',
                                display: 'flex',
                                height: '2.5em',
                                justifyContent: 'center',
                                width: '2.5em',
                                margin: '0 1em'
                            }}
                        >
                            { quantity }
                        </div>
                        <span
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            style={{ alignItems: 'baseline', cursor: 'pointer', display: 'flex', fontSize: '4em' }}> - </span>
                    </div>
                    <div
                        style={{
                            alignItems: 'center',
                            background: '#1A4350',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1em 0',
                            padding: '0.5em 0',
                            width: '100%'
                        }}
                    >
                        <div
                            style={{
                                background: '#C4C4C4',
                                cursor: 'pointer',
                                margin: '0 1em',
                                padding: '0.5em'
                            }}
                        >
                            Comprar Agora
                        </div>
                        <div
                            style={{
                                background: '#C4C4C4',
                                cursor: 'pointer',
                                margin: '0 1em',
                                padding: '0.5em'
                            }}
                        >
                            Adicionar à sacola
                        </div>
                        </div>
                </div>
            </div>
            <div
                style={{
                    border: '1px solid',
                    marginTop: '2em',
                    minHeight: '5em'
                }}
            >
                {product.description}
            </div>
        </div>
    )
}

export default ProductUnit
