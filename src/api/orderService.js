import apiClient from "./apiClient";

// Fetch all orders for admin/staff
export const getOrders = async () => {
  try {
    const response = await apiClient.get("/staff/orders/");
    console.log("Fetched orders:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Update order status and payment status
export const updateOrderStatus = async (orderId, status, paymentStatus) => {
  try {
    const response = await apiClient.patch(
      `/staff/orders/${orderId}/update-status/`,
      {
        status: status,
        payment_status: paymentStatus,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
