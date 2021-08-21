import axios from 'axios';

const {
  REACT_APP_SERVER_ENV = 'local',
  REACT_APP_SERVER_PORT = 3000,
} = process.env;

const backendHost = {
  production: '',
  staging: '',
  development: '',
  local: `http://localhost:${REACT_APP_SERVER_PORT}`,
  demo: '',
};

const instance = axios.create({
  baseURL: backendHost[REACT_APP_SERVER_ENV],
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});

export const multipartInstance = axios.create({
  baseURL: backendHost[REACT_APP_SERVER_ENV],
  headers: {
    'Content-Type':
      'multipart/form-data;',
  },
});

export const host = backendHost[REACT_APP_SERVER_ENV];

export default instance;
