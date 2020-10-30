import React from 'react'
import Img from 'gatsby-image'
import {  FaRegHeart  } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'

import MenuItems from '../menu'


const Landscape = ({
    imgSrc,
}) => {
    return (
        <>
        <Img
          style={{
            width: '18vw'
          }}
          fluid={imgSrc}
        />
      <div
        style={{
          display: '-webkit-flex',
          justifyContent: 'space-evenly',
          padding: '1vh 1vw',
          fontFamily: 'Quicksand',
          width: '65vw'
        }}
      >
        <MenuItems />
      </div>
        <div
          style={{
            width: '5vw',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <FaRegHeart size='2vw'/>
          <BiShoppingBag size='2vw' />
        </div>
        </>
    )
}

export default Landscape