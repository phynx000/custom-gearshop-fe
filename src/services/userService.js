import axios from "axios";
import { BASE_API_URL } from "../config/config";

/**
 * Get user profile information
 * @returns {Promise} Promise with user profile data
 */
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(`${BASE_API_URL}/user/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

/**
 * Update user profile information
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} Promise with updated profile data
 */
export const updateUserProfile = async (profileData) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.patch(
      `${BASE_API_URL}/user/profile/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

/**
 * Get user orders history
 * @param {Object} filters - Optional filters for orders
 * @returns {Promise} Promise with orders data
 */
export const getUserOrders = async (filters = {}) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.limit) params.append("limit", filters.limit);
    if (filters.offset) params.append("offset", filters.offset);

    const queryString = params.toString();
    // const url = queryString
    //   ? `${BASE_API_URL}/user/orders/?${queryString}`
    //   : `${BASE_API_URL}/user/orders/`;

    const url = `${BASE_API_URL}/orders/history/`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

/**
 * Get specific order details
 * @param {string|number} orderId - Order ID
 * @returns {Promise} Promise with order details
 */
export const getOrderDetails = async (orderId) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.get(
      `${BASE_API_URL}/user/orders/${orderId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

/**
 * Change user password
 * @param {Object} passwordData - Password change data
 * @returns {Promise} Promise with response data
 */
export const changePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const response = await axios.patch(
      `${BASE_API_URL}/user/change-password/`,
      passwordData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
