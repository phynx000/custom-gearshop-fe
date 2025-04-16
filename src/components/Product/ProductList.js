import React from "react";
import useProduct from "../../hook/useProduct";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { products, loading, error } = useProduct();
  // const firstImage = product.images.length > 0 ? product.images[0].image : "https://via.placeholder.com/150";
  return (
    <div className="product-list-container row">
      {/* <CategorySideBar /> */}
      <div className="product-list-title col-lg-12">
        <h4>Danh sách sản phẩm</h4>
      </div>

      <div className="product-list-content row">
        <div className="product-container col-lg-12 d-flex flex-wrap">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductItem key={product.id} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
