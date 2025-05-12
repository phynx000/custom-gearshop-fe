import axios from "axios";
import { BASE_API_URL } from "../config/config";

// phương lấy tất cả item của giỏ hàng m
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

// Phương thức thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (productId, quantity) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${BASE_API_URL}/cart/add/`,
      {
        product_id: productId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Trigger cart update animation
    window.dispatchEvent(new Event("cartUpdated"));

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:", error);
    throw error;
  }
};

export const updateQuantityInCart = async (itemId, quantity) => {
  const accessToken = localStorage.getItem("access_token");

  try {
    const response = await axios.patch(
      `${BASE_API_URL}/cart/update/`, // URL tới API cập nhật số lượng giỏ hàng
      {
        item_id: itemId,
        quantity: quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Trigger cart update animation
    window.dispatchEvent(new Event("cartUpdated"));

    return response.data.item; // Trả về item sau khi đã cập nhật
  } catch (error) {
    console.error("Có lỗi khi cập nhật giỏ hàng:", error);
    throw error;
  }
};

// Create a simple toast notification for cart actions
export const showCartNotification = (message) => {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerText = message;

  // Add toast to body
  document.body.appendChild(toast);

  // Add visible class to trigger animation
  setTimeout(() => toast.classList.add("visible"), 10);

  // Remove toast after animation
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};
