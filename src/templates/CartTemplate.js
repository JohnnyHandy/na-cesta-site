import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Layout from "../components/layout"
import Seo from "../components/seo"
import MenuComponent from '../components/menu/menuItems'
import CartComponent from '../components/cart/cart'


const CartTemplate = () => {
  const cartState = useSelector(state => state.cart)
  const dispatch = useDispatch()
  return (
    <Layout>
      <Seo title="Carrinho" />
      <MenuComponent />
      <CartComponent
        cartItems={cartState.items}
        dispatch={dispatch}
      />
    </Layout>
  )
}

export default CartTemplate
