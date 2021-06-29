import React from 'react'
import { Router } from '@reach/router'

import Layout from "../components/layout"
import PrivateRoute from '../containers/Private/PrivateRoute'
import Profile from '../containers/User/Profile'
import Orders from '../containers/User/Orders'
import EditUserData from '../containers/User/EditUserData'

const UserRouter = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path='/user/profile' component={Profile} />
        <PrivateRoute path='/user/orders' component={Orders} />
        <PrivateRoute path='/user/edit/personal' component={EditUserData} />
      </Router>
    </Layout>
  )
}

export default UserRouter
