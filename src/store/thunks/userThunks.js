// src/store/thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, loginApi } from "../../services/userService";

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchUsersApi();
});

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);