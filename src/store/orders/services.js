import http from '../../utils/http'

const ordersUrl = '/orders'

export const createOrder = (params) => {
  return http.post(ordersUrl, params)
}