import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  addProductToCart,
  showCartNotification,
} from "../../services/cartService";
import "./FeaturedProductItem.scss";

const FeaturedProductItem = ({
  product,
  priority,
  showPriorityBadge = false,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Safety check for product
  if (!product || typeof product !== "object") {
    console.error("Invalid product passed to FeaturedProductItem:", product);
    return null;
  }

  const handleViewProduct = () => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!product.id) return;

    try {
      setIsAddingToCart(true);
      await addProductToCart(product.id, 1);
      showCartNotification("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      showCartNotification("Không thể thêm sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getMainImage = () => {
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      return product.images[0].image || "/placeholder-image.jpg";
    }
    return "/placeholder-image.jpg";
  };

  const getDiscountPercentage = () => {
    if (
      product.sale_price &&
      product.original_price &&
      !isNaN(product.sale_price) &&
      !isNaN(product.original_price)
    ) {
      const discount =
        ((product.original_price - product.sale_price) /
          product.original_price) *
        100;
      return Math.round(discount);
    }
    return 0;
  };

  const discountPercentage = getDiscountPercentage();

  const getPriorityBadgeColor = (priority) => {
    if (!priority || isNaN(priority)) return "secondary";
    if (priority <= 1) return "danger";
    if (priority <= 3) return "warning";
    if (priority <= 5) return "info";
    return "secondary";
  };

  const getPriorityText = (priority) => {
    if (!priority || isNaN(priority)) return "";
    if (priority <= 1) return "TOP";
    if (priority <= 3) return "HOT";
    if (priority <= 5) return "NEW";
    return `#${priority}`;
  };

  // Safe string conversion for display
  const productName = String(product.name || "Unnamed Product");
  const brandName = product.brand ? String(product.brand) : null;

  return (
    <Card
      className="featured-product-item h-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProduct}
    >
      <div className="product-image-container">
        <Card.Img
          variant="top"
          src={getMainImage()}
          alt={productName}
          className="product-image"
        />

        {/* Badges */}
        <div className="product-badges">
          {/* Priority badge */}
          {showPriorityBadge && priority && !isNaN(priority) && (
            <Badge
              bg={getPriorityBadgeColor(priority)}
              className="badge-priority"
            >
              {getPriorityText(priority)}
            </Badge>
          )}

          {product.is_new && (
            <Badge bg="success" className="badge-new">
              Mới
            </Badge>
          )}

          {discountPercentage > 0 && (
            <Badge bg="danger" className="badge-discount">
              -{discountPercentage}%
            </Badge>
          )}

          {product.featured && (
            <Badge bg="warning" text="dark" className="badge-featured">
              <i className="bi bi-star-fill me-1"></i>
              Nổi bật
            </Badge>
          )}
        </div>

        {/* Hover overlay */}
        <div className={`product-overlay ${isHovered ? "show" : ""}`}>
          <div className="overlay-buttons">
            <Button
              size="sm"
              variant="light"
              className="overlay-btn"
              onClick={handleViewProduct}
              title="Xem chi tiết"
            >
              <i className="bi bi-eye"></i>
            </Button>
            <Button
              size="sm"
              variant="success"
              className="overlay-btn"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              title="Thêm vào giỏ hàng"
            >
              <i
                className={`bi ${
                  isAddingToCart ? "bi-arrow-repeat" : "bi-cart-plus"
                }`}
              ></i>
            </Button>
          </div>
        </div>
      </div>

      <Card.Body className="p-3">
        <div className="product-info">
          {/* Brand */}
          {brandName && (
            <div className="product-brand text-muted small">{brandName}</div>
          )}

          {/* Product name */}
          <Card.Title className="product-name" title={productName}>
            {productName}
          </Card.Title>

          {/* Rating (if available) */}
          {product.rating && !isNaN(product.rating) && (
            <div className="product-rating mb-2">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`bi ${
                      index < Math.floor(product.rating)
                        ? "bi-star-fill"
                        : "bi-star"
                    }`}
                  ></i>
                ))}
              </div>
              <small className="text-muted ms-1">
                ({product.review_count || 0})
              </small>
            </div>
          )}

          {/* Price */}
          <div className="product-price">
            {product.sale_price && !isNaN(product.sale_price) ? (
              <>
                <span className="current-price fw-bold">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="original-price text-muted text-decoration-line-through ms-2">
                  {formatPrice(product.original_price)}
                </span>
              </>
            ) : (
              <span className="current-price fw-bold">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          {/* Quick specs (if available) */}
          {product.key_features &&
            Array.isArray(product.key_features) &&
            product.key_features.length > 0 && (
              <div className="product-specs mt-2">
                <small className="text-muted">
                  {product.key_features
                    .slice(0, 2)
                    .map((feature) => String(feature))
                    .join(" • ")}
                </small>
              </div>
            )}
        </div>
      </Card.Body>

      {/* Quick add to cart button for mobile */}
      <div className="quick-add-mobile d-block d-md-none">
        <Button
          variant="success"
          size="sm"
          className="w-100"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          <i
            className={`bi ${
              isAddingToCart ? "bi-arrow-repeat" : "bi-cart-plus"
            } me-1`}
          ></i>
          {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ"}
        </Button>
      </div>
    </Card>
  );
};

export default FeaturedProductItem;
