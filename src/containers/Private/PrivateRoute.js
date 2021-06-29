import React from "react"
import { navigate } from "gatsby"
import {useSelector} from 'react-redux'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isLoggedIn } = useSelector(state => state.auth)
  if (!isLoggedIn && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }
  return <Component location={location} {...rest} />
}
export default PrivateRoute