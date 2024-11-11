// src/utils/auth.js
import axios from 'axios';

export const signin = async ({ email, password }) => {
  // Send request to the Next.js API route
  const response = await axios.post('/api/auth/login', {
    email,
    password,
  });
  return response;
};

export const register = async (userData) => {
  // Send request to the Next.js API route
  const response = await axios.post('/api/auth/register', userData);
  return response;
};
