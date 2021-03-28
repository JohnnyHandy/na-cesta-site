import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import RegisterContainer from '../containers/Auth/register'
import LoginContainer from '../containers/Auth/login'

const AuthTemplate = ({ pageContext: { auth } }) => {

  return (
    <Layout>
        <SEO title={auth === 'register'  ? 'Registre-se' : 'Entrar'} />
        <MenuComponent />
        { auth === 'register'
        ? <RegisterContainer />
        : <LoginContainer /> }
    </Layout>
  )  
}

export default AuthTemplate

