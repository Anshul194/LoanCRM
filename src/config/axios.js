import axios from "axios";

// Base URL from Vite env or fallback to localhost:4000
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach tokens from localStorage to each request (Authorization header and Cookie)
api.interceptors.request.use((config) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      config.headers = config.headers || {};
      // Only set Authorization if not already set
      if (!config.headers.Authorization && !config.headers.authorization) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["x-access-token"] = `Bearer ${accessToken}`;
      }
    }

    // Send tokens in headers instead of cookies
    if (refreshToken) {
      config.headers = config.headers || {};
      // Attach refresh token in a header (same key style as accessToken)
      config.headers["x-refresh-token"] = `Bearer ${refreshToken}`;
    }
  } catch {
    // ignore storage errors
  }
  return config;
});

// Return response directly or throw standardized error
api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
