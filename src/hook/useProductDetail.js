import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import {
  addProductToCart,
  showCartNotification,
} from "../services/cartService";

const useProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  //   console.log("productId", productId);

  const handleAddToCart = async (productId, quantity) => {
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
