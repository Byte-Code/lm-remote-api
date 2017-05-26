import axios from 'axios/dist/axios';

export function createHttpClient(apiKey) {
  const headers = { 'x-square-api-key': apiKey, 'Content-type': 'application/json' };

  return axios.create({ headers });
}
