import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;

// Correct: add `/auth/login` to the `/api` base URL
axios.post(`${BASE_URL}/auth/login`, {
  email: 'user@example.com',
  password: 'secret123'
});
