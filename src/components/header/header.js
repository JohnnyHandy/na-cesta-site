import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Portrait from './portrait'
import Landscape from './landscape'
import { DesktopBreakpoint, PhoneBreakpoint } from '../responsive/devices'


const Header = ({ siteTitle, setMenu, menu }) => {
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
    <header 
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        id='header'
        style={{
          margin: `0 auto`,
          padding: `0 1.0875rem`,
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
            menu={menu}
            setMenu={setMenu}
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
