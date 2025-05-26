import { React, useState, useEffect } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/productService";
import { useCategory } from "./useCategory";

const useProduct = () => {
  const { currentCategory } = useCategory();
  const [products, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Nếu currentCategory là undefined hoặc "all", lấy tất cả sản phẩm
    const fetchProducts =
      !currentCategory || currentCategory === "all"
        ? getAllProducts()
        : getProductsByCategory(currentCategory);

    fetchProducts
      .then((data) => {
        setProductsList(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
        setProductsList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentCategory]);
  // console.log("products", products);

  return {
    products,
    loading,
    error,
  };
};

export default useProduct;
