import React from "react"
import { useSelector } from 'react-redux'

import Layout from "../components/layout"
import Seo from "../components/seo"
import StoreContainer from '../containers/Store'

const ProdListTemplate = ({ pageContext: { modelData, title } }) => {
  const { filters } = useSelector(state => state.products)
  const formatShowcase = modelData.map(model => {
    const { products } = model
    let filteredProducts = products
    Object.keys(filters).filter(filter => filters[filter].length > 0).forEach((filter) => {
      if(filter === 'size'){
        filteredProducts = filteredProducts.filter(product => product.stocks.some(stock => filters[filter].includes(stock.size)))
      }
      if(filter === 'price'){
        const transformedFilterValues = filters[filter].map(item => {
          const getValues = item.split('-')
          return({
            max: getValues[1] * 1,
            min: getValues[0] * 1
          })
        })
        filteredProducts = filteredProducts.filter(product => {
          const price = product.price || model.price
          const discount = product.discount || model.discount
          const deal_price = product.deal_price || model.deal_price
          const is_deal = product.is_deal || model.is_deal
          const productPrice = is_deal
          ? deal_price
          : discount
          ? price * (discount/100)
          : price
          
        return transformedFilterValues.some(item => {
          return productPrice >= item.min && productPrice <= item.max
        })
        })
      }
    })
    if(filteredProducts.length === 0) return null
    const notFilteredProducts = products.filter(product => !filteredProducts.some(filtered => filtered.id === product.id))
    
    let dealProducts = []
    let notDealProducts = []
    notFilteredProducts.forEach(product => {
      product.is_deal && dealProducts.push(product)
      !product.is_deal && notDealProducts.push(product)
    })
    dealProducts = dealProducts.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
    notDealProducts = notDealProducts.sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at)
    })
    const { name, price, discount, deal_price, is_deal, ref, images, imageArray } = filteredProducts.concat(dealProducts, notDealProducts)[0]
    return ({
      name: model.name,
      modelRef: model.ref,
      path: `/${model.ref}-${model.name.replace(/\s/g, '-')}-${ref}-${name.replace(/\s/g, '-')}`,
      price: price || model.price,
      discount: discount || model.discount,
      deal_price: deal_price || model.deal_price,
      is_deal: is_deal || model.is_deal,
      images: images,
      imageArray: imageArray
    })
  }).filter(item => item !== null)
  return (
    <Layout>
        <Seo title={title} />
        <StoreContainer products={formatShowcase} />
    </Layout>
  )
}

export default ProdListTemplate