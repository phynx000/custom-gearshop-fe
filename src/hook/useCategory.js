import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCategories } from "../services/categoryService";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories([{ id: "all", name: "Tất cả sản phẩm" }, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  });

  const handleChangeCategory = (categoryId) => {
    if (categoryId === "all") {
      navigate("/products");
    } else {
      navigate(`/products?category=${categoryId}`);
    }
  };

  const query = new URLSearchParams(location.search);
  const currentCategory = query.get("category") || "all";

  return {
    categories,
    loading,
    error,
    handleChangeCategory,
    currentCategory,
  };
};

export default useCategory;
