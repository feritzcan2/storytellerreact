import axios from 'axios';
import { getToken, logout } from '../context/AuthContext';
const api = axios.create({
  baseURL: process.env.REACT_APP_HOST_API + '/',
});
api.interceptors.request.use(async (config) => {

  const token = getToken();
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS';
  let organisationId = localStorage.getItem("OrganisationId");
  if(organisationId)
       config.headers.OrganisationId = organisationId;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;


  }
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logout();
    }
  }
);

export default api;
