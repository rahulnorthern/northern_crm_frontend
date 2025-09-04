import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProjectsApi } from "../../services/projectService";

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProjectsApi();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);