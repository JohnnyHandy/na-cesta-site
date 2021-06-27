import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import RegisterContainer from '../containers/Auth/register'
import LoginContainer from '../containers/Auth/login'
import ConfirmAccountContainer from '../containers/Auth/confirm'

const AuthTemplate = ({ pageContext: { auth , title}, ...rest }) => {

  return (
    <Layout>
        <SEO title={title} />
        <MenuComponent />
        { auth === 'register'
        ? <RegisterContainer {...rest} />
        : auth === 'login'
        ? <LoginContainer {...rest} />
        : <ConfirmAccountContainer {...rest}  /> }
    </Layout>
  )  
}

export default AuthTemplate

