import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import PropTypes from "prop-types"
import React from "react"
import { FaUserCircle, FaRegHeart,  } from 'react-icons/fa'
import { BiShoppingBag } from 'react-icons/bi'
import styled from '@emotion/styled'

const AnchorItem = styled('a')`
  text-decoration: underline;
  color: black;
`

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
  query {
    logo: file(relativePath: { eq: "useveranologo.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`)

const MenuItems = () => [
  {
    href: '/',
    description: 'Quem Somos',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    href: '/',
    description: 'Contato',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    href: '/',
    description: 'Trocas e devoluções',
    icon: null,
    iconProps: {},
    style: {}
  },
  {
    href: '/',
    description: 'Entrar / Registrar',
    icon: FaUserCircle,
    iconProps: {
      size: '2vw'
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '15vw',
      justifyContent: 'space-evenly'
    }
  }
].map(item =>(
  <AnchorItem
    href={item.href}
    style={item.style}
  >
    {item.description} {item.icon && React.createElement(item.icon, {...item.iconProps})}
  </AnchorItem>
))

  return (
    <header 
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid black'
        }}
      >
        <Img
          style={{
            width: '18vw'
          }}
          fluid={data.logo.childImageSharp.fluid}
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
      </div>
    </header>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
