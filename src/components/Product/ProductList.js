import React from "react";
import useProduct from "../../hook/useProduct";


const ProductList = () => {
  const { products, loading, error } = useProduct();
  return (
    <div className="product-list">
      <h4>Danh sách sản phẩm</h4>
      <div className="row">
        {/* Render your product items here */}
        {/* Example: <ProductItem /> */}
      </div>
    </div>
  );
};

export default ProductList;
