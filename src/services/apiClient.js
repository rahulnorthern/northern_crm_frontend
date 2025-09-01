import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request Interceptor → add token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor → store tokens on login/refresh
apiClient.interceptors.response.use(
  (response) => {
    // Example: if login or refresh returns new token
    if (response.data?.accessToken) {
      Cookies.set("accessToken", response.data.accessToken, { expires: 1 }); // 1 day
    }
    return response;
  },
  async (error) => {
    // Handle token expiry → auto logout or refresh
    if (error.response?.status === 401) {
      try {
        // attempt refresh using cookie refreshToken
        const refreshRes = await axios.post(
          `${BASE_URL}/api/users/refresh`,
          {},
          { withCredentials: true }
        );

        if (refreshRes.data?.accessToken) {
          Cookies.set("accessToken", refreshRes.data.accessToken, { expires: 1 });
          error.config.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
          return apiClient(error.config); // retry original request
        }
      } catch (refreshError) {
        Cookies.remove("accessToken");
        window.location.href = "/login"; // logout
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
