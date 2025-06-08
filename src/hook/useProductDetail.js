import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById } from "../api/productService";
import { addProductToCart, showCartNotification } from "../api/cartService";

const useProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  //   console.log("productId", productId);

  const handleAddToCart = async (productId, quantity) => {
    if (!isAuthenticated) {
      showCartNotification("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/login");
      return;
    }

    try {
      setIsAddingToCart(true);
      await addProductToCart(productId, quantity);
      showCartNotification("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      showCartNotification("Không thể thêm sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then((data) => setProduct(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    // console.log("product", product);
  }, [productId]);

  return {
    product,
    loading,
    error,
    isAddingToCart,
    handleAddToCart,
  };
};

export default useProductDetail;
