import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || '/api';
const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});
export const userApi = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get('/users/' + id),
  create: (data) => api.post('/users/register', data),
  update: (id, data) => api.put('/users/' + id, data),
  delete: (id) => api.delete('/users/' + id),
};
export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get('/products/' + id),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put('/products/' + id, data),
  delete: (id) => api.delete('/products/' + id),
  search: (name) => api.get('/products/search?name=' + name),
};
export const orderApi = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get('/orders/' + id),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch('/orders/' + id + '/status?status=' + status),
  cancel: (id) => api.delete('/orders/' + id),
};
export default api;
