import axios from 'axios';

export default function createHttpClient(apiKey) {
  const headers = { 'x-square-api-key': apiKey, 'Content-type': 'application/json' };

  return axios.create({ headers });
}
