import apiClient from "./apiClient";

// Create Project
export const createProjectApi = async (data) => {
  const res = await apiClient.post("/api/project/create", data);
  return res.data;
};

// Get Projects
export const getProjectsApi = async () => {
  const res = await apiClient.get("/api/project/get");
  return res.data;
};