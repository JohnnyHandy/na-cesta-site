import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import {  FaRegHeart  } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'

import MenuItems from '../menu'


const Landscape = ({
    imgSrc,
}) => {
    return (
        <>
        <Link
          to='/'
        >
          <Img
            style={{
              width: '18vw'
            }}
            fluid={imgSrc}
          />
        </Link>
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
          <Link to='/carrinho'>
            <BiShoppingBag size='2vw' />
          </Link>
        </div>
        </>
    )
}

export default Landscape