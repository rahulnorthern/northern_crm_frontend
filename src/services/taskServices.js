import apiClient from "./apiClient";

// Create Task
export const createTaskApi = async (data) => {
  const res = await apiClient.post("/api/task/create", data);
  return res.data;
};

// Get Tasks
export const getTasksApi = async () => {
  const res = await apiClient.get("/api/task/get");
  return res.data;
};

// Get Task by ID
export const getTaskApi = async (data) => {
  const res = await apiClient.get(`/api/task/${data.taskId}?projId=${data.projId}`);
  return res.data;
};