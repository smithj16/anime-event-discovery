// src/utils/customAxios.js
import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer
  ? "http://localhost:3000/api/proxy"
  : "/api/proxy";

const api = axios.create({ baseURL });

api.interceptors.request.use(
  (config) => {
    // Grab token from "x-access-token" if provided
    const token = config.headers?.["x-access-token"];

    // If no token yet and it's client-side, optionally check localStorage
    if (!isServer && !token) {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        config.headers.Authorization = `Bearer ${localToken}`;
      }
    }

    // If there is a token from the header, set Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optionally handle 401 in response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!isServer) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
