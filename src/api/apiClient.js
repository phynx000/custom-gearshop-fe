import axios from "axios";
import { BASE_API_URL } from "./config";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

// Request interceptor to add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.warn("Token expired or invalid. Clearing authentication data.");

      // Clear all auth data
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");

      // Create a custom event to notify other components
      window.dispatchEvent(
        new CustomEvent("auth:logout", {
          detail: { reason: "token_expired" },
        })
      );

      // Only redirect if not already on login page
      if (!window.location.pathname.includes("/login")) {
        // Show a brief message before redirect
        const event = new CustomEvent("auth:show-expired-message");
        window.dispatchEvent(event);

        // Redirect after a short delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
