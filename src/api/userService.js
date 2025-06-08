import apiClient from "./apiClient";

/**
 * Get user profile information
 * @returns {Promise} Promise with user profile data
 */
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(`/user/profile/`);
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
    const response = await apiClient.patch(`/user/profile/`, profileData);
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
    const response = await apiClient.get(`/orders/history/`);
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
    const response = await apiClient.get(`/user/orders/${orderId}/`);
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
    const response = await apiClient.post(
      `/user/change-password/`,
      passwordData
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
