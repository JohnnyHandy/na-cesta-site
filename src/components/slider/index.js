import React from 'react'
import Slider from 'react-slick'
// import './slider.css'


const DefaultSlider = (props) => {
    return (
        <Slider
        {...props}>
            {props.children}
        </Slider>
    )
}

export default DefaultSlider