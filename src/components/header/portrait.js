import React from 'react'
import Img from 'gatsby-image'
import { FaUserCircle, FaRegHeart,  } from 'react-icons/fa'
import { BiShoppingBag , BiMenuAltLeft} from 'react-icons/bi'


const PortraitHeader = ({ imgSrc, ...props }) => {
    const [showMenu, setShowMenu] = React.useState(false)
    return (
        <div
            style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
        <BiMenuAltLeft
            size='15vw'
            onClick={() => setShowMenu(!showMenu)}
        />
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