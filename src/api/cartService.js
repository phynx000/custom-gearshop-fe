import apiClient from "./apiClient";

// phương lấy tất cả item của giỏ hàng m
export const getAllCartItem = async () => {
  try {
    const response = await apiClient.get(`/cart/items/`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu sản phẩm", error);
    return [];
  }
};

// Phương thức thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (productId, quantity) => {
  try {
    const response = await apiClient.post(`/cart/add/`, {
      product_id: productId,
      quantity: quantity,
    });

    // Fetch updated cart data after adding product
    const updatedCartData = await getAllCartItem();
    if (Array.isArray(updatedCartData)) {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartData));
    }

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"));

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng:", error);
    throw error;
  }
};

export const updateQuantityInCart = async (itemId, quantity) => {
  try {
    const response = await apiClient.patch(`/cart/update/`, {
      item_id: itemId,
      quantity: quantity,
    });

    // Fetch updated cart data after updating quantity
    const updatedCartData = await getAllCartItem();
    if (Array.isArray(updatedCartData)) {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartData));
    }

    // Trigger cart update event
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
// ...existing code...

// ...existing code...

// Thêm method xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (itemId) => {
  try {
    const response = await apiClient.delete(`/cart/remove/${itemId}/`);

    // Fetch updated cart data after removing item
    const updatedCartData = await getAllCartItem();
    if (Array.isArray(updatedCartData)) {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartData));
    }

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"));

    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    } else if (error.response?.status === 404) {
      throw new Error("Sản phẩm không tồn tại trong giỏ hàng.");
    } else if (error.response?.status >= 500) {
      throw new Error("Lỗi server. Vui lòng thử lại sau.");
    }

    throw error.response?.data || { message: "Có lỗi xảy ra khi xóa sản phẩm" };
  }
};

// Function to clear all cart items from server
export const clearAllCartItems = async () => {
  try {
    console.log("Clearing all cart items from server...");

    // Get current cart items first
    const cartItems = await getAllCartItem();

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      console.log("Cart is already empty");
      return { success: true };
    }

    // Remove each item from the server
    const removePromises = cartItems.map((item) =>
      apiClient.delete(`/cart/remove/${item.id}/`)
    );

    await Promise.all(removePromises);
    console.log(
      `Successfully removed ${cartItems.length} items from server cart`
    );

    return { success: true };
  } catch (error) {
    console.error("Error clearing cart items from server:", error);
    throw error;
  }
};

// Function to clear cart after successful payment
export const clearCartAfterPayment = async () => {
  try {
    console.log("Clearing cart after successful payment...");

    // Step 1: Clear items from server first
    await clearAllCartItems();

    // Step 2: Clear localStorage
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.removeItem("checkoutItems");

    // Step 3: Trigger cart update event to refresh header count
    window.dispatchEvent(new Event("cartUpdated"));

    console.log("Cart cleared successfully from both server and localStorage");
    return { success: true };
  } catch (error) {
    console.error("Error clearing cart after payment:", error);

    // If server clearing fails, still clear localStorage for better UX
    localStorage.setItem("cartItems", JSON.stringify([]));
    localStorage.removeItem("checkoutItems");
    window.dispatchEvent(new Event("cartUpdated"));

    return {
      success: false,
      error: error.message,
      warning: "Cart cleared locally but server items may remain",
    };
  }
};

// Function to refresh cart data (useful after payment operations)
export const refreshCartData = async () => {
  try {
    const updatedCartData = await getAllCartItem();
    if (Array.isArray(updatedCartData)) {
      localStorage.setItem("cartItems", JSON.stringify(updatedCartData));
      window.dispatchEvent(new Event("cartUpdated"));
    }
    return updatedCartData;
  } catch (error) {
    console.error("Error refreshing cart data:", error);
    throw error;
  }
};

// ...existing code...

// ...existing code...
