// src/utils/api.js
import axios from "axios";
import {store} from "@/store/index";
import { logout, getToken } from "@/store/slices/userSlice";

const api = axios.create({
  baseURL: "https://99b5-67-165-141-227.ngrok-free.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check for 401 Unauthorized response
    if (error.response && error.response.status === 401) {
      // Dispatch logout action or handle token refresh logic
      // store.dispatch(logout());
      // redirect to login page
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
