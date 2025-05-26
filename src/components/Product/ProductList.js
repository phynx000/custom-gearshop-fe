import React, { useState } from "react";
import useProduct from "../../hook/useProduct";
import ProductItem from "./ProductItem";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import "./ProductList.scss";

const ProductList = () => {
  const { products, loading, error } = useProduct();
  const [sortOption, setSortOption] = useState("newest");
  const [showAllProducts, setShowAllProducts] = useState(false);

  const displayProducts = showAllProducts ? products : products.slice(0, 15);
  const showMoreButton = !showAllProducts && products.length > 15;

  if (loading) {
    return (
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Đang tải sản phẩm...</span>
            </div>
            <p className="mt-3">Đang tải sản phẩm...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="alert alert-danger text-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Có lỗi xảy ra: {error}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col xs={12}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item active>Sản phẩm</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <Row className="align-items-center">
                <Col xs={12} md={6}>
                  <h4 className="m-0">Danh sách sản phẩm</h4>
                </Col>
                <Col xs={12} md={6}>
                  <div className="d-flex justify-content-md-end mt-3 mt-md-0">
                    <Form.Select
                      className="w-auto"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="newest">Mới nhất</option>
                      <option value="price_asc">Giá: Thấp đến cao</option>
                      <option value="price_desc">Giá: Cao đến thấp</option>
                      <option value="name_asc">Tên: A-Z</option>
                      <option value="name_desc">Tên: Z-A</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-3">
              {displayProducts.length > 0 ? (
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
                  {displayProducts.map((product) => (
                    <Col key={product.id}>
                      <ProductItem product={product} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-search fs-1 text-muted"></i>
                  <p className="mt-3">Không tìm thấy sản phẩm nào phù hợp.</p>
                  <Button variant="outline-success">Xem tất cả sản phẩm</Button>
                </div>
              )}

              {showMoreButton && (
                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="outline-success"
                    onClick={() => setShowAllProducts(true)}
                    className="px-4"
                  >
                    <i className="bi bi-chevron-down me-2"></i>
                    Hiển thị thêm
                  </Button>
                </div>
              )}
            </Card.Body>

            {/* {products.length > 0 && (
              <Card.Footer className="bg-white border-top d-flex justify-content-center py-3">
                <nav>
                  <ul className="pagination m-0">
                    <li className="page-item disabled">
                      <span className="page-link">Trước</span>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Sau
                      </a>
                    </li>
                  </ul>
                </nav>
              </Card.Footer>
            )} */}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
