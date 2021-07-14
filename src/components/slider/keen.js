import React from "react"
import { useKeenSlider } from "keen-slider/react"
import { BiLeftArrow, BiRightArrow, BiUpArrow, BiDownArrow } from 'react-icons/bi'
import "keen-slider/keen-slider.min.css"

const KeenSlider = ({ children, vertical }) => {
  const [, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    slidesPerView: 4,
    spacing: 10,
    loop: true,
    vertical: vertical,
    centered: true,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
  })

  const style={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: vertical ? 'column' : 'row'
  }

  const prevArrowFunction = (e) => e.stopPropagation() || slider.prev()
  const nextArrowFunction = (e) => e.stopPropagation() || slider.next()

  const PrevArrow = () => {
    return vertical
    ? <BiUpArrow onClick={prevArrowFunction} />
    : <BiLeftArrow onClick={prevArrowFunction} />
  }

  const NextArrow = () => {
    return vertical
    ? <BiDownArrow onClick={nextArrowFunction} />
    : <BiRightArrow onClick={nextArrowFunction} />
  }

  return (
    <>
    <div style={style}>
      <PrevArrow />
    <div
        ref={sliderRef}
        className='keen-slider'
      >
        {children}
    </div>
      <NextArrow />
      </div>
    </>
  )
}

export default KeenSlider