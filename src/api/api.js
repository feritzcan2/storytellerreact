import axios from "axios";
import { getToken, logout } from "../context/AuthContext";
const api = axios.create({
  baseURL: "http://localhost:5016/admin",
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Access-Control-Allow-Methods"] =
    "DELETE, POST, GET, OPTIONS";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    logout();
  }
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("logout");
      logout();
    }
  }
);

export default api;
