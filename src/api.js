import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

const api = {
  // Login request
  login: (email, password) =>
    axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
    }),

  // Signup request
  signup: (userData) =>
    axios.post(`${BASE_URL}/api/auth/signup`, userData),

  // Prediction request
  predict: (data, token) =>
    axios.post(`${BASE_URL}/api/cutoffs/predict`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // Get branch list
  getBranches: () =>
    axios.get(`${BASE_URL}/api/cutoffs/branches`),
};

export default api;
