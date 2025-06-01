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
    return response.data;
  } catch (error) {
    console.error("Có lỗi xẩy ra khi lấy dữ liệu sản phẩm", error);
    return [];
  }
};

// Get product versions by product group
export const getProductVersions = async (productId) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/products/${productId}/versions/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product versions:", error);
    throw error;
  }
};

export const getFeaturedProducts = async (groupName = "homepage") => {
  try {
    const response = await axios.get(`${BASE_API_URL}/featured/${groupName}/`);

    // Transform the response to match our component's expected format
    const group = response.data;
    console.log("Featured products group:", group);

    // Ensure featured_products exists and is an array
    if (!group.featured_products || !Array.isArray(group.featured_products)) {
      console.warn("No featured_products found or not an array:", group);
      throw new Error("Invalid featured products data");
    }

    const products = group.featured_products
      .filter((item) => item && item.product) // Filter out invalid items
      .sort((a, b) => (a.priority || 0) - (b.priority || 0)) // Sort by priority
      .map((item) => ({
        ...item.product,
        featured: true,
        priority: item.priority,
      }));

    return {
      results: products,
      count: products.length,
      group_name: group.name,
      group_description: group.description,
      message: "Featured products retrieved successfully",
    };
  } catch (error) {
    console.error("Error fetching featured products:", error);

    // Fallback to regular products if featured group fails
    try {
      const fallbackResponse = await axios.get(
        `${BASE_API_URL}/products/?limit=12`
      );

      // Handle different response structures
      let products = [];
      if (fallbackResponse.data.results) {
        products = fallbackResponse.data.results;
      } else if (Array.isArray(fallbackResponse.data)) {
        products = fallbackResponse.data;
      } else {
        console.error(
          "Unexpected fallback response structure:",
          fallbackResponse.data
        );
        products = [];
      }

      return {
        results: products,
        count: products.length,
        group_name: "fallback",
        group_description: "Sản phẩm mới nhất",
        message: "Fallback products retrieved",
      };
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw fallbackError;
    }
  }
};

// Keep other existing functions - Fixed URL consistency
export const getNewProducts = async (limit = 20) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/products/?limit=${limit}&ordering=-created_at`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching new products:", error);
    throw error;
  }
};

export const getPopularProducts = async (limit = 20) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/products/?limit=${limit}&ordering=-created_at`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    throw error;
  }
};
