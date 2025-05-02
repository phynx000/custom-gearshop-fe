import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";

const useProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   console.log("productId", productId);

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
  };
};

export default useProductDetail;
