import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import RegisterContainer from '../containers/Auth/register'

const RegisterTemplate = ({ pageContext: { auth } }) => {
  return (
    <Layout>
        <SEO title={'Registre-se'} />
        <MenuComponent />
        <RegisterContainer />
    </Layout>
  )  
}

export default RegisterTemplate

