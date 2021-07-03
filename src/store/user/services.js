import http from '../../utils/http'

const usersUrl = '/users'
const authUrl = '/auth'
const addressUrl = '/addresses'

export const updateUser = ({ params, id }) => http.put(`${usersUrl}/${id}`, params)
export const updatePassword = (params) => http.put(`${authUrl}/password`, params)
export const createAddress = (params) => http.post(`${addressUrl}`, params)
export const updateAddress = ({ params, addressId }) => http.put(`${addressUrl}/${addressId}`, params)