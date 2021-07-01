import http from '../../utils/http';

const authEndpoint = '/auth';

export const signIn = (credentials) => http.post(`${authEndpoint}/sign_in`, credentials);
export const signOut = () => http.delete(`${authEndpoint}/sign_out`);
export const signUp = (params) => http.post(authEndpoint, params)

export const verifyCredentials = () => http.get(`${authEndpoint}/validate_token`)
export const sendPasswordReset = (params) => http.post(`${authEndpoint}/password`, params)
export const resetPassword = ({ data, headers }) => http.put(`${authEndpoint}/password`, data, { headers: { ...headers } })
export const confirmAccount = (token) => http.get(`${authEndpoint}/confirmation?confirmation_token=${token}`)
export const verifyReset = (token) => http.get(`${authEndpoint}/password/edit?reset_password_token=${token}`)