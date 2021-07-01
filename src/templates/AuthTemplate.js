import React from 'react'

import Layout from "../components/layout"
import Seo from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import RegisterContainer from '../containers/Auth/register'
import LoginContainer from '../containers/Auth/login'
import ConfirmAccountContainer from '../containers/Auth/confirm'
import ForgotPassword from '../containers/Auth/forgot'
import VerifyResetToken from '../containers/Auth/verify'
import ResetPassword from '../containers/Auth/reset'

const AuthTemplate = ({ pageContext: { auth , title }, ...rest }) => {

  return (
    <Layout>
        <Seo title={title} />
        <MenuComponent />
        { auth === 'register'
        ? <RegisterContainer {...rest} />
        : auth === 'login'
        ? <LoginContainer {...rest} />
        : auth ==='confirm'
        ? <ConfirmAccountContainer {...rest}  />
        : auth ==='forgot'
        ? <ForgotPassword {...rest}/>
        : auth === 'verify'
        ? <VerifyResetToken {...rest} />
        : auth === 'reset'
        ? <ResetPassword {...rest} />
        : null}
    </Layout>
  )  
}

export default AuthTemplate

