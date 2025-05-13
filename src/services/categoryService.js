import axios from "axios";
import { BASE_API_URL } from "../config/config";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/categories`);
    return response.data || [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu DANH MỤC SẢN PHẨM", error);
    throw error;
  }
};
