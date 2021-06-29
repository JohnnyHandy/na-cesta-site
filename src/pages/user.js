import React from 'react'
import { Router } from '@reach/router'

import Layout from "../components/layout"
import PrivateRoute from '../containers/Private/PrivateRoute'
import Profile from '../containers/User/Profile'
import Orders from '../containers/User/Orders'

const UserRouter = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path='/user/profile' component={Profile} />
        <PrivateRoute path='/user/orders' component={Orders} />
      </Router>
    </Layout>
  )
}

export default UserRouter
