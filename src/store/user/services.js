import http from '../../utils/http'

const usersUrl = '/users'
const authUrl = '/auth'

export const updateUser = ({ params, id }) => http.put(`${usersUrl}/${id}`, params)
export const updatePassword = (params) => http.put(`${authUrl}/password`, params)