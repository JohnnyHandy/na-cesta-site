import React from 'react'
import { Router } from '@reach/router'

import Layout from "../components/layout"
import PrivateRoute from '../containers/Private/PrivateRoute'
import Profile from '../containers/User/Profile'
import Orders from '../containers/User/Orders'
import EditUserData from '../containers/User/EditUserData'
import EditUserEmail from '../containers/User/EditEmail'
import EditPassword from '../containers/User/EditPassword'
import Addresses from '../containers/User/Addresses'
import CreateAddress from '../containers/User/CreateAddress'
import EditAddress from '../containers/User/EditAddress'

const UserRouter = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path='/user/profile' component={Profile} />
        <PrivateRoute path='/user/orders' component={Orders} />
        <PrivateRoute path='/user/edit/personal' component={EditUserData} />
        <PrivateRoute path='/user/edit/email' component={EditUserEmail} />
        <PrivateRoute path='/user/edit/password/' component={EditPassword} />
        <PrivateRoute path='/user/addresses' component={Addresses} />
        <PrivateRoute path='/user/addresses/create' component={CreateAddress} />
        <PrivateRoute path='/user/addresses/edit' component={EditAddress} />
      </Router>
    </Layout>
  )
}

export default UserRouter
