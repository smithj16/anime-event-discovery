// src/utils/customAxios.js
import axios from 'axios';
import cookie from 'cookie';
import { parse } from 'cookie';

const isServer = typeof window === 'undefined';

const baseURL = isServer
  ? 'http://localhost:3000/api/proxy' // Use your development server URL
  : '/api/proxy';

const api = axios.create({
  baseURL,
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    let token;

    if (isServer) {
      // Server-side: Extract token from cookies in the request headers
      if (config.headers && config.headers.Cookie) {
        const cookies = parse(config.headers.Cookie);
        token = cookies.cookiesessiontoken;
        console.log("token:",token,"cookies",cookies);
      }
    } else {
      // Client-side: Extract token from `document.cookie`
      const cookies = cookie.parse(document.cookie || '');
      token = cookies.cookiesessiontoken;
      console.log("token:",token,"cookies",cookies);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor remains the same
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    if (error.response && error.response.status === 401) {
      // Redirect to login page or dispatch logout action
      if (!isServer) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
