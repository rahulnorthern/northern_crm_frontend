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

// Update Task by ID
export const updateTaskApi = async (taskId, data) => {
  const res = await apiClient.put(`/api/task/${taskId}`, data);
  return res.data;
};

// Add Comment to Task
export const addCommentApi = async (taskId, data) => {
  const res = await apiClient.post(`/api/taskcomment/add/${taskId}`, data);
  return res.data;
};