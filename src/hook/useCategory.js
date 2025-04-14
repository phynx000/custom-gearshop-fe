import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import { THREE_DOT_URL_ICON } from "../config/config";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams(); // <- Lấy slug từ URL nếu có

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories([
          {
            id: "all",
            name: "Tất cả sản phẩm",
            slug: "",
            icon: THREE_DOT_URL_ICON,
          },
          ...data,
        ]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChangeCategory = (categorySlug) => {
    if (categorySlug === "all") {
      navigate("/products");
    } else {
      navigate(`/products/${categorySlug}`);
    }
  };

  // const query = new URLSearchParams(location.search);
  // const currentCategory = query.get("category");

  return {
    categories,
    loading,
    error,
    handleChangeCategory,
    currentCategory: slug || "all",
  };
};
