import React from "react";
import ProductItem from "./ProductItem";
import { Row } from "react-bootstrap";

const ListFlashSale = ({ products }) => {
  // Hiển thị 4 sản phẩm demo
  const demoProducts = Array(4).fill(null);

  return (
    <Row className="g-3">
      {/* Sử dụng products nếu có, nếu không thì dùng demoProducts */}
      {(products || demoProducts).map((product, index) => (
        <ProductItem key={index} product={product} />
      ))}
    </Row>
  );
};

export default ListFlashSale;
