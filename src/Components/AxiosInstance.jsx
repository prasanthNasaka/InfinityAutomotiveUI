import axios from "axios";

// Base URL
const BASE_URL = "https://localhost:7206";

// Create Axios instance
const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Header
AxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found. User needs to log in.");
      return Promise.reject(new Error("Authentication token is missing"));
    }

    config.headers["Authorization"] = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Token Expiry
AxiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return response if successful
  },
  (error) => {
    if (error.response) {
      // Token Expiry Check (401 or custom error message)
      if (error.response.status === 401) {
        console.error("Auth token expired. Redirecting to login...");
        localStorage.removeItem("authToken"); // Clear expired token
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(new Error("Session expired. Please log in again."));
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
