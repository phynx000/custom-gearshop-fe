import axios from "axios";
import { BASE_API_URL } from "../config/config";

export const getAllCartItem = async () => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.get(`${BASE_API_URL}/cart/items/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu sản phẩm", error);
    return [];
  }
};
