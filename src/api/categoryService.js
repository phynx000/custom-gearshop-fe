import axios from "axios";
import apiClient from "./apiClient";
import { BASE_API_URL } from "./config";

// Get all categories (public endpoint)
export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/categories/`);
    return response.data || [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu DANH MỤC SẢN PHẨM", error);
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/categories/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu danh mục theo ID", error);
    throw error;
  }
};

// Get category by slug
export const getCategoryBySlug = async (slug) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/categories/slug/${slug}/`
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu danh mục theo slug", error);
    throw error;
  }
};

// Create new category (admin only)
export const createCategory = async (categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("code", categoryData.code);

    if (categoryData.icon && categoryData.icon instanceof File) {
      formData.append("icon", categoryData.icon);
    }

    const response = await apiClient.post(`/categories/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi tạo danh mục", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xẩy ra khi tạo danh mục"
      );
    }
    throw error;
  }
};

// Update category (admin only)
export const updateCategory = async (id, categoryData) => {
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("code", categoryData.code);

    if (categoryData.icon && categoryData.icon instanceof File) {
      formData.append("icon", categoryData.icon);
    }

    const response = await apiClient.put(`/categories/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi cập nhật danh mục", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xẩy ra khi cập nhật danh mục"
      );
    }
    throw error;
  }
};

// Delete category (admin only)
export const deleteCategory = async (id) => {
  try {
    const response = await apiClient.delete(`/categories/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi xóa danh mục", error);
    if (error.response?.data) {
      throw new Error(
        error.response.data.error || "Có lỗi xẩy ra khi xóa danh mục"
      );
    }
    throw error;
  }
};
