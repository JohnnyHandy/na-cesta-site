import axios from 'axios';

const apiUrl = 'https://lhpx7am1gk.execute-api.sa-east-1.amazonaws.com/dev';

export const ordersApi = ({ data, method }) => {
  const options = {
    method,
    url: `${apiUrl}/orders`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'allow',
    },
    data: {
      ...data,
    },
  };
  return axios(options);
};