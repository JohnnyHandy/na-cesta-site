import React from 'react'
import Img from 'gatsby-image'
import { FaRegHeart,  } from 'react-icons/fa'
import { BiShoppingBag , BiMenuAltLeft} from 'react-icons/bi'


const PortraitHeader = ({ imgSrc, toggleMenu, reference, ...props }) => {
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
        <div
            ref={reference}
        >
            <BiMenuAltLeft
            size='15vw'
            onClick={toggleMenu}
            />
        </div>
        <Img
            fluid={imgSrc}
            style={{
                width: '70vw'
            }}
        />
        <div
                  style={{
                    width: '15vw',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}        
        >
        <FaRegHeart size='15vw'/>
        <BiShoppingBag size='15vw' />
        </div>
       </div>
    )
}

export default PortraitHeader