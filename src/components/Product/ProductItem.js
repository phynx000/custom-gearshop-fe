import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./ProductItem.scss";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return <div>Loading...</div>;
  }

  const firstImage =
    product?.images?.length > 0
      ? product.images[0].image
      : "https://via.placeholder.com/300";

  // Format price to Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Add to cart functionality can be implemented here
    console.log("Add to cart:", product.id);
  };

  return (
    <Card className="product-card">
      <div className="product-img-container">
        <Card.Img variant="top" src={firstImage} className="product-img" />
      </div>
      <Card.Body className="product-body">
        <Card.Title className="product-title">{product.name}</Card.Title>
        <Card.Text className="product-price">
          {formatPrice(product.original_price)}
        </Card.Text>
        <div className="product-buttons">
          <Button
            variant="outline-primary"
            className="btn-view-details"
            onClick={handleViewDetails}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="primary"
            className="btn-add-to-cart"
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus"></i> Thêm vào giỏ
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
