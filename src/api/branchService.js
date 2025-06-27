import axios from "axios";
import apiClient from "./apiClient";
import { BASE_API_URL } from "./config";

// Get all provinces
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/provinces/`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};

// Get districts by province ID
export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/districts/?province_id=${provinceId}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

// Get all branches
export const getBranches = async () => {
  try {
    const response = await apiClient.get("/branches/");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

// Get branch by ID
export const getBranchById = async (id) => {
  try {
    const response = await apiClient.get(`/branches/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching branch by ID:", error);
    throw error;
  }
};

// Create new branch (admin only)
export const createBranch = async (branchData) => {
  try {
    const response = await apiClient.post("/branches/", branchData);
    return response.data;
  } catch (error) {
    console.error("Error creating branch:", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xảy ra khi tạo chi nhánh"
      );
    }
    throw error;
  }
};

// Update branch (admin only)
export const updateBranch = async (id, branchData) => {
  try {
    const response = await apiClient.put(`/branches/${id}/`, branchData);
    return response.data;
  } catch (error) {
    console.error("Error updating branch:", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xảy ra khi cập nhật chi nhánh"
      );
    }
    throw error;
  }
};

// Delete branch (admin only)
export const deleteBranch = async (id) => {
  try {
    const response = await apiClient.delete(`/branches/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting branch:", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xảy ra khi xóa chi nhánh"
      );
    }
    throw error;
  }
};

// Get branches with stock for staff
export const getBranchesWithStock = async () => {
  try {
    const response = await apiClient.get("/staff/branches-with-stock/");
    return response.data;
  } catch (error) {
    console.error("Error fetching branches with stock:", error);
    throw error;
  }
};

// Update stock quantity for staff
export const updateStock = async (stockId, stockData) => {
  try {
    const response = await apiClient.patch(
      `/staff/stock/${stockId}/`,
      stockData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating stock:", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xảy ra khi cập nhật tồn kho"
      );
    }
    throw error;
  }
};
