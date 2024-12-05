import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:32832',
});

export default api;
