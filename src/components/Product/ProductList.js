import React from "react";
import useProduct from "../../hook/useProduct";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import ProductItem from "./ProductItem";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductList.scss";

const ProductList = () => {
  const { products, loading, error } = useProduct();
  // const firstImage = product.images.length > 0 ? product.images[0].image : "https://via.placeholder.com/150";

  if (loading) {
    return <div className="text-center my-5">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger my-5">Có lỗi xảy ra: {error}</div>
    );
  }

  return (
    <Container className="product-list-container">
      <Row className="mb-4">
        <Col>
          <h2 className="product-list-title">Danh sách sản phẩm</h2>
        </Col>
      </Row>

      <Row className="product-grid">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>

      {products.length === 0 && (
        <div className="text-center py-5">
          <p>Không tìm thấy sản phẩm nào.</p>
        </div>
      )}
    </Container>
  );
};

export default ProductList;
