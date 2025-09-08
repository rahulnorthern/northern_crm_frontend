import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "../thunks/projectthunk";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    list: [],
    totalRows: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.projects;
        state.totalRows = action.payload.totalProjects;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default projectSlice.reducer;