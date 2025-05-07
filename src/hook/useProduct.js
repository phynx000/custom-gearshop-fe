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
    console.log("currentCategory", currentCategory);
    (currentCategory === "all"
      ? getAllProducts()
      : getProductsByCategory(currentCategory)
    )
      .then((data) => setProductsList(Array.isArray(data) ? data : []))
      .catch((error) => setError(error).finally(() => setLoading(false)));
  }, [currentCategory]);
  // console.log("products", products);

  return {
    products,
    loading,
    error,
  };
};

export default useProduct;
