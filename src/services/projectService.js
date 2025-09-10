import apiClient from "./apiClient";

// Create Project
export const createProjectApi = async (data) => {
  const res = await apiClient.post("/api/project/create", data);
  return res.data;
};

// Get Projects
export const getProjectsApi = async (filter) => {
  let myProjFilter = false;
  if(filter?.myProj===true || filter?.myProj===false){
    myProjFilter = true;
  }
  const res = await apiClient.get(`/api/project/get?status=${filter.filter}&page=${filter.currentPage}&rows=${filter.rowsPerPage}${myProjFilter?`&myProj=${filter.myProj}`:''}`);
  return res.data;
};

// Get Projects by ID
export const getProjectApi = async (id, filterOption) => {
  const res = await apiClient.get(`/api/project/${id}?status=${filterOption.filter}&page=${filterOption.currentPage}&rows=${filterOption.rowsPerPage}`);
  return res.data;
};