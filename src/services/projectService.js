import apiClient from "./apiClient";

// Create Project
export const createProjectApi = async (data) => {
  const res = await apiClient.post("/api/project/create", data);
  return res.data;
};

// Get Projects
export const getProjectsApi = async (filter) => {
  const res = await apiClient.get(`/api/project/get?status=${filter.filter}&page=${filter.currentPage}&rows=${filter.rowsPerPage}`);
  return res.data;
};

// Get Projects by ID
export const getProjectApi = async (id) => {
  const res = await apiClient.get(`/api/project/${id}`);
  return res.data;
};