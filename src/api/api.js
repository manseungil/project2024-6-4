import axios from "axios";

export const SERVER_URL = 'http://127.0.0.1:8080';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

export default api;