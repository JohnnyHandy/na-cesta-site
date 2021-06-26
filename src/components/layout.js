/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from 'gatsby-plugin-image'

import { PhoneBreakpoint } from './responsive/devices'
import Menu from './menu'
import Header from '../components/header/header'
import "./layout.css"

const Layout = ({ children, ...rest }) => {
  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)
  const [menu, setMenu] = React.useState(false)
  const MenuIconRef = React.useRef()
  const updateWindowDimentsions = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  }
  React.useEffect(() => {
    updateWindowDimentsions()
    window.addEventListener('resize', updateWindowDimentsions)
    return () => {
      window.removeEventListener('resize', updateWindowDimentsions)
    }
  })
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const toggleMenu = () => {
      setMenu(!menu)
  }
  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          zIndex: '-2',
          width: '100%',
          height: '100vh'
        }}
      >
        <StaticImage
          aspectRatio={2280/1500}
          style={{ width: '100%', height: '100%' }}
          imgStyle={{ width: '100%', height: '100%' }}
          src='../images/bg-main.jpeg'
          alt='Use Verano'
        />
      </div>

      <Header reference={MenuIconRef} siteTitle={data.site.siteMetadata?.title || `Title`} toggleMenu={toggleMenu} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: width,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >

        <PhoneBreakpoint>
          {menu && <Menu height={height} menu={menu} MenuIconRef={MenuIconRef} setMenu={setMenu} />}
        </PhoneBreakpoint>
        <main
          style={{
            // overflow: menu ? 'hidden' : 'scroll'
          }}
        >{children}</main>
        <footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="https://www.github.com/JohnnyHandy">JohnnyHandy</a>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
