import React from "react";
import { ListGroup, Image } from "react-bootstrap";
import { useCategory } from "../../hook/useCategory";

const CategorySideBar = () => {
  const { categories, loading, error, handleChangeCategory, currentCategory } =
    useCategory();

  return (
    <div className="category-sidebar">
      <h5 className="mb-3 fw-bold">Danh Mục Sản Phẩm</h5>

      {loading ? (
        <div className="text-center py-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">Không thể tải danh mục</div>
      ) : (
        <ListGroup variant="flush">
          {categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              action
              active={category.slug === currentCategory}
              onClick={() => handleChangeCategory(category.slug)}
              className="d-flex align-items-center px-2 py-3 border-bottom"
            >
              {category.icon && (
                <Image
                  src={category.icon}
                  className="me-2"
                  width="24"
                  height="24"
                  alt={category.name}
                />
              )}
              <span>{category.name}</span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CategorySideBar;
