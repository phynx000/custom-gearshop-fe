import axios from "axios";
import { BASE_API_URL } from "../config/config";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/products/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu sản phẩm", error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/products/${categoryId}/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error(
      "Có lỗi xẩy ra khi lấy dữ liệu sản phẩm theo danh mục",
      error
    );
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/products/${id}/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu sản phẩm", error);
    return [];
  }
};
