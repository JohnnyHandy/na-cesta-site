import http from '../../utils/http';

const authEndpoint = '/auth';

export const signIn = (credentials) => http.post(`${authEndpoint}/sign_in`, credentials);
export const signOut = () => http.delete(`${authEndpoint}/sign_out`);
export const signUp = (params) => http.post(authEndpoint, params)

export const verifyCredentials = () => http.get(`${authEndpoint}/validate_token`)