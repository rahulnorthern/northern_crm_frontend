// src/api/userApi.js
import apiClient from "./apiClient";
import Cookies from "js-cookie";

// Login API → tokens stored automatically by interceptor
export const loginApi = async (credentials) => {
  const res = await apiClient.post("/api/user/login", credentials);
  return res.data;
};

// Refresh Token API
export const refreshTokenApi = async () => {
  const res = await apiClient.post("/auth/refresh", {
    refreshToken: Cookies.get("refreshToken"),
  });
  return res.data;
};

// Get Users
export const fetchUsersApi = async () => {
  const res = await apiClient.get("/user");
  return res.data;
};

// Register User
export const registerUserApi = async (userData) => {
  const res = await apiClient.post("/api/user/register", userData);
  return res.data;
};

// Get Users
export const getUsersApi = async () => {
  const res = await apiClient.get("/api/user/get-users");
  return res.data;
};
