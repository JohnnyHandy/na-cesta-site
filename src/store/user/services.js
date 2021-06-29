import http from '../../utils/http'

const usersUrl = '/users'

export const updateUser = ({ params, id }) => http.put(`${usersUrl}/${id}`, params)