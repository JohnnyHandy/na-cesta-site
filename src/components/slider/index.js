import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './slider.css'


const DefaultSlider = ({ reference, children, settings }) => {
    return (
        <Slider
        {...settings}
        ref={reference}
        >
            {children}
        </Slider>
    )
}

export default DefaultSlider