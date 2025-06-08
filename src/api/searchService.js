import axios from "axios";
import { BASE_API_URL } from "./config";

export const searchProducts = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams();
    params.append("q", query);

    if (filters.category) params.append("category", filters.category);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.limit) params.append("limit", filters.limit);

    const response = await axios.get(
      `${BASE_API_URL}/search/?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};

// Get search suggestions
export const getSearchSuggestions = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/search/suggestions/?q=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Search suggestions error:", error);
    throw error;
  }
};

// Get search filters
export const getSearchFilters = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/search/filters/`);
    return response.data;
  } catch (error) {
    console.error("Search filters error:", error);
    throw error;
  }
};
