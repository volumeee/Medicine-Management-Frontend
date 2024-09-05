// src/utils/api.js
import axios from "axios";
import { getToken, removeToken } from "./auth";
import store from "../redux/store";
import { showSessionExpiredModal } from "../redux/actions/authActions";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      removeToken();
      store.dispatch(showSessionExpiredModal());
    }
    return Promise.reject(error);
  }
);

export default api;
