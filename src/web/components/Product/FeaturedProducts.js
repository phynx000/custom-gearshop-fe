import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import FeaturedProductItem from "./FeaturedProductItem";
import { getFeaturedProducts } from "../../../api/productService";
import "./FeaturedProducts.scss";

const FeaturedProducts = ({ groupName = "homepage", showTitle = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [groupInfo, setGroupInfo] = useState(null);

  const loadFeaturedProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // console.log("Loading featured products for group:", groupName);
      const data = await getFeaturedProducts(groupName);

      // console.log("Featured products response:", data);

      // Validate the data structure
      if (!data || typeof data !== "object") {
        throw new Error("Invalid data structure received");
      }

      // Ensure results is an array
      const productsArray = Array.isArray(data.results) ? data.results : [];

      // Filter out any invalid products
      const validProducts = productsArray.filter(
        (product) =>
          product && typeof product === "object" && product.id && product.name
      );

      // console.log("Valid products:", validProducts.length);

      setProducts(validProducts);
      setGroupInfo({
        name: data.group_name || "Unknown",
        description: data.group_description || "Sản phẩm nổi bật",
        message: data.message || "Products loaded",
      });
    } catch (err) {
      console.error("Error loading featured products:", err);
      setError("Không thể tải sản phẩm nổi bật");
      setProducts([]); // Set empty array on error
      setGroupInfo(null);
    } finally {
      setLoading(false);
    }
  }, [groupName]);

  useEffect(() => {
    loadFeaturedProducts();
  }, [loadFeaturedProducts]);

  const displayProducts = showAll ? products : products.slice(0, 10);
  const hasMoreProducts = products.length > 10;

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="success" />
        <p className="mt-2 text-muted">Đang tải sản phẩm nổi bật...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        <i className="bi bi-exclamation-triangle me-2"></i>
        {error}
        <div className="mt-2">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={loadFeaturedProducts}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Thử lại
          </Button>
        </div>
      </Alert>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-star fs-1 text-muted"></i>
        <p className="mt-3 text-muted">Chưa có sản phẩm nổi bật nào.</p>
        {groupInfo?.message === "Fallback products retrieved" && (
          <small className="text-warning">
            <i className="bi bi-info-circle me-1"></i>
            Hiển thị sản phẩm mới nhất do chưa cấu hình nhóm sản phẩm nổi bật
          </small>
        )}
      </div>
    );
  }

  return (
    <div className="featured-products">
      {/* Optional title for standalone use */}
      {showTitle && groupInfo && (
        <div className="featured-header mb-4">
          <h4 className="mb-2">
            <i className="bi bi-star-fill text-warning me-2"></i>
            {String(groupInfo.description || "Sản phẩm nổi bật")}
          </h4>
          {groupInfo.message === "Fallback products retrieved" && (
            <small className="text-warning">
              <i className="bi bi-info-circle me-1"></i>
              Hiển thị sản phẩm mới nhất
            </small>
          )}
        </div>
      )}

      {/* Products grid */}
      <Row className="g-3">
        {displayProducts.map((product, index) => {
          // Additional safety check for each product
          if (!product || typeof product !== "object" || !product.id) {
            console.warn("Invalid product at index", index, product);
            return null;
          }

          return (
            <Col
              key={`product-${product.id}-${index}`}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              xl={2}
            >
              <FeaturedProductItem
                product={product}
                priority={product.priority}
                showPriorityBadge={groupInfo?.name !== "fallback"}
              />
            </Col>
          );
        })}
      </Row>

      {/* Show more/less button */}
      {hasMoreProducts && (
        <div className="text-center mt-4">
          <Button
            variant={showAll ? "outline-secondary" : "outline-success"}
            onClick={() => setShowAll(!showAll)}
            className="px-4 featured-toggle-btn"
          >
            <i
              className={`bi ${
                showAll ? "bi-chevron-up" : "bi-chevron-down"
              } me-2`}
            ></i>
            {showAll ? "Ẩn bớt" : `Xem thêm (${products.length - 10} sản phẩm)`}
          </Button>
        </div>
      )}

      {/* Debug info in development */}
      {/* {process.env.NODE_ENV === "development" && groupInfo && (
        <div className="mt-3 p-2 bg-light rounded">
          <small className="text-muted">
            <strong>Debug:</strong> Group: {String(groupInfo.name)} | Products:{" "}
            {products.length} | Status: {String(groupInfo.message)}
          </small>
        </div>
      )} */}
    </div>
  );
};

export default FeaturedProducts;
