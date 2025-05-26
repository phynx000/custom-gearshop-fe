import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./ProductItem.scss";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  // Sử dụng dữ liệu mẫu khi product không được truyền vào
  const demoProduct = {
    id: 1,
    name: "Gaming Headset Pro X",
    original_price: 1290000,
    sale_price: 990000,
    discount_percent: 23,
    images: [
      { image: "https://via.placeholder.com/300x300?text=Gaming+Headset" },
    ],
  };

  // Sử dụng demoProduct nếu product không tồn tại
  const productData = product || demoProduct;

  const firstImage =
    productData?.images?.length > 0
      ? productData.images[0].image
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
    navigate(`/product/${productData.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Add to cart functionality can be implemented here
    console.log("Add to cart:", productData.id);
  };

  return (
    <Card className="h-100 shadow-sm product-card border-0">
      {productData.discount_percent > 0 && (
        <Badge
          bg="danger"
          className="position-absolute top-0 end-0 mt-2 me-2 px-2 py-1"
        >
          -{productData.discount_percent}%
        </Badge>
      )}
      <div className="card-img-top-wrapper pt-3 px-3">
        <Card.Img
          variant="top"
          src={firstImage}
          className="img-fluid product-img mx-auto d-block"
          style={{ height: "180px", objectFit: "contain" }}
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate h6 mb-1">
          {productData.name}
        </Card.Title>
        <div className="mt-auto">
          {productData.sale_price &&
          productData.sale_price < productData.original_price ? (
            <>
              <Card.Text className="mb-1">
                <span className="text-danger fw-bold">
                  {formatPrice(productData.sale_price)}
                </span>
              </Card.Text>
              <Card.Text className="mb-2">
                <small className="text-muted text-decoration-line-through">
                  {formatPrice(productData.original_price)}
                </small>
              </Card.Text>
            </>
          ) : (
            <Card.Text className="text-danger fw-bold mb-2">
              {formatPrice(productData.original_price)}
            </Card.Text>
          )}
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="text-truncate"
              onClick={handleViewDetails}
            >
              <i className="bi bi-eye me-1"></i> Xem chi tiết
            </Button>
            <Button
              variant="success"
              size="sm"
              className="text-white"
              onClick={handleAddToCart}
            >
              <i className="bi bi-cart-plus me-1"></i> Thêm vào giỏ
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
