const api = {
  login: (email, password) =>
    axios.post(`${BASE_URL}/auth/login`, { email, password }),

  signup: (userData) =>
    axios.post(`${BASE_URL}/auth/signup`, userData)
};

export default api;
