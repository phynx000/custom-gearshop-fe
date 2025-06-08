import axios from "axios";

const API_URL = "http://localhost:8000/api";

/**
 * Creates an order with VNPAY payment method
 * @param {Object} orderData Order data
 * @returns {Promise} Promise with the response data containing payment_url
 */
export const createVnpayOrder = async (orderData) => {
  console.log(orderData);
  try {
    // Get the authentication token from localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    // Set authorization header with the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Make the API call with proper authentication
    const response = await axios.post(
      `${API_URL}/orders/create/`,
      orderData, // Request body
      config // Config with headers
    );

    return response.data;
  } catch (error) {
    console.error("VNPAY order creation error:", error);
    throw error;
  }
};

/**
 * Creates a COD order
 * @param {Object} orderData Order data
 * @returns {Promise} Promise with the response data
 */
export const createCodOrder = async (orderData) => {
  try {
    // Get the authentication token from localStorage
    console.log("Creating COD order with data:", orderData);
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    // Set authorization header with the Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Make the API call with proper authentication
    const response = await axios.post(
      `${API_URL}/orders/create/`,
      orderData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("COD order creation error:", error);
    throw error;
  }
};

/**
 * Format checkout data to match the VNPAY API requirements
 * @param {Object} checkoutData Checkout form data
 * @returns {Object} Formatted order data for VNPAY
 */
export const formatVnpayOrderData = (checkoutData) => {
  return {
    total_price: checkoutData.totalAmount,
    payment_method: "VNPAY",
    vnp_transaction_id: "",
    shipping_address: checkoutData.shipping.address,
    phone: checkoutData.shipping.phone,
    email: checkoutData.shipping.email,
    note: checkoutData.shipping.note || "Order from web",
    items: checkoutData.products.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: item.product?.original_price || item.price,
    })),
  };
};

/**
 * Format checkout data to match the COD API requirements
 * @param {Object} checkoutData Checkout form data
 * @returns {Object} Formatted order data for COD
 */
export const formatCodOrderData = (checkoutData) => {
  return {
    total_price: checkoutData.totalAmount,
    payment_method: "COD",
    shipping_address: checkoutData.shipping.address,
    phone: checkoutData.shipping.phone,
    email: checkoutData.shipping.email,
    note: checkoutData.shipping.note || "Order from web",
    recipient_name: checkoutData.shipping.fullName,
    items: checkoutData.products.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: item.product?.original_price || item.price,
    })),
  };
};
