import apiClient from "./apiClient";

// Get dashboard overview statistics
export const getDashboardOverview = async () => {
  try {
    const response = await apiClient.get("/dashboard/overview/");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard overview:", error);
    throw error;
  }
};

// Get order statistics for the last 7 days
export const getOrderStats = async () => {
  try {
    const response = await apiClient.get("/dashboard/orders/stats/");
    return response.data;
  } catch (error) {
    console.error("Error fetching order statistics:", error);
    throw error;
  }
};

// Get low stock products
export const getLowStockProducts = async () => {
  try {
    const response = await apiClient.get("/dashboard/products/low-stock/");
    return response.data;
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
};
