import React from "react";
import { ListGroup, Image, Badge } from "react-bootstrap";
import { useCategory } from "../../../hook/useCategory";
import "./CategorySideBar.scss";

const CategorySideBar = () => {
  const { categories, loading, error, handleChangeCategory, currentCategory } =
    useCategory();

  if (loading) {
    return (
      <div className="category-sidebar">
        <div className="text-center py-4">
          <div
            className="spinner-border spinner-border-sm text-success"
            role="status"
          >
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2 mb-0 text-muted small">Đang tải danh mục...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-sidebar">
        <div className="category-header">
          {/* <h6 className="mb-0">
            <i className="bi bi-list-ul me-2"></i>
            Danh mục sản phẩm
          </h6> */}
        </div>
        <div className="alert alert-danger m-3 py-2">
          <small>
            <i className="bi bi-exclamation-triangle me-1"></i>
            Không thể tải danh mục
          </small>
        </div>
      </div>
    );
  }

  return (
    <div className="category-sidebar">
      <div className="category-content">
        <ListGroup variant="flush">
          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              action
              active={
                category.slug === currentCategory ||
                (category.id === "all" && currentCategory === "all")
              }
              onClick={() => handleChangeCategory(category.slug)}
              className="category-item"
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  {category.icon ? (
                    <Image
                      src={category.icon}
                      className="me-3 category-icon-img"
                      width="20"
                      height="20"
                      alt={category.name}
                    />
                  ) : (
                    <i
                      className={`bi ${
                        category.id === "all" ? "bi-grid-3x3-gap" : "bi-tag"
                      } me-3 category-icon`}
                    ></i>
                  )}
                  <span className="category-name">{category.name}</span>
                </div>
                <div className="d-flex align-items-center">
                  {category.product_count && category.product_count > 0 && (
                    <Badge
                      bg="light"
                      text="dark"
                      className="me-2 product-count"
                    >
                      {category.product_count}
                    </Badge>
                  )}
                  <i className="bi bi-chevron-right category-arrow"></i>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default CategorySideBar;
