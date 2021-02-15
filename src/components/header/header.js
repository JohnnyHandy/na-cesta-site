import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Portrait from './portrait'
import Landscape from './landscape'
import { DesktopBreakpoint, PhoneBreakpoint } from '../responsive/devices'


const Header = ({ siteTitle, toggleMenu, reference }) => {
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
  
  return (
    <header>
      <title> {siteTitle} </title>
      <div
        id='header'
        style={{
          margin: `0 auto`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid black'
        }}
      >
        <DesktopBreakpoint>
          <Landscape
            imgSrc={data.logo.childImageSharp.fluid}
          />
        </DesktopBreakpoint>
        <PhoneBreakpoint>
           <Portrait
            reference={reference}
            toggleMenu={toggleMenu}
            imgSrc={data.logo.childImageSharp.fluid}
           />
        </PhoneBreakpoint>
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
