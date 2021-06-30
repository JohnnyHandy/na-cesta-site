import React from 'react'
import { Router } from '@reach/router'

import Layout from "../components/layout"
import PrivateRoute from '../containers/Private/PrivateRoute'
import Profile from '../containers/User/Profile'
import Orders from '../containers/User/Orders'
import EditUserData from '../containers/User/EditUserData'
import EditUserEmail from '../containers/User/EditEmail'
import EditPassword from '../containers/User/EditPassword'

const UserRouter = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path='/user/profile' component={Profile} />
        <PrivateRoute path='/user/orders' component={Orders} />
        <PrivateRoute path='/user/edit/personal' component={EditUserData} />
        <PrivateRoute path='/user/edit/email' component={EditUserEmail} />
        <PrivateRoute path='/user/edit/password/' component={EditPassword} />
      </Router>
    </Layout>
  )
}

export default UserRouter
