import { createContext } from "react";
import { Redirect } from "react-router-dom";

const defaultBehaviour = {
  isAllowedTo: () => Promise.resolve(false),
};

const PermissionContext = createContext(defaultBehaviour);

export default PermissionContext;

export const TOKEN_KEY = "@VizeDefteri-Token";
export const isAuthenticated = () => {
  var item = localStorage.getItem(TOKEN_KEY);
  return item !== null;
};
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
};
