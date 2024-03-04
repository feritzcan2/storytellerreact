import { createContext } from 'react';
import { Redirect } from 'react-router-dom';

const defaultBehaviour = {
  isAllowedTo: () => Promise.resolve(false),
};

const PermissionContext = createContext(defaultBehaviour);

export default PermissionContext;

export const TOKEN_KEY = 'accessToken';
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken !== null;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(TOKEN_KEY, token);
};
export const setOrganisationId = (organisationId) => {
  localStorage.setItem("OrganisationId", organisationId);
  sessionStorage.setItem("OrganisationId", organisationId);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
};
