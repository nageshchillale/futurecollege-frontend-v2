import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

const api = {
  login: (email, password) =>
    axios.post(`${BASE_URL}/api/auth/login`, { email, password }),

  signup: (userData) =>
    axios.post(`${BASE_URL}/api/auth/register`, userData),

  predict: (params, token) =>
    axios.get(`${BASE_URL}/api/cutoffs/predict`, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    }),

  getBranches: () =>
    axios.get(`${BASE_URL}/api/cutoffs/branches`),
};

export default api;
