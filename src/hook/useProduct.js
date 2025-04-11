import { React, useState, useEffect } from "react";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/productService";
import { useCategory } from "./useCategory";

const useProduct = () => {
  const categoryHook = useCategory();
  const [currentCategory, setCurrentCategory] = Array.isArray(categoryHook)
    ? categoryHook
    : ["all", () => {}];
  const [products, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    (currentCategory === "all"
      ? getAllProducts()
      : getProductsByCategory(currentCategory)
    )
      .then((data) => setProductsList(Array.isArray(data) ? data : []))
      .catch((error) => setError(error).finally(() => setLoading(false)));
  }, [currentCategory]);

  return {
    products,
    loading,
    error,
    setCurrentCategory,
  };
};

export default useProduct;
