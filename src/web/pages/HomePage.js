import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategorySideBar from "../components/CategorySideBar/CategorySideBar";
import BannerCarousel from "../components/Banner/BannerCasourel";
import "bootstrap-icons/font/bootstrap-icons.css";
import SellingPoint from "../components/Banner/SellingPoint";
import FeaturedProducts from "../components/Product/FeaturedProducts";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "./HomePage.scss"; // Add this for additional styling

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col lg={3} md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm category-card">
            <Card.Body className="p-0">
              <CategorySideBar />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9} md={8}>
          <Card className="shadow-sm overflow-hidden">
            <Card.Body className="p-0">
              <BannerCarousel />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <SellingPoint />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white border-bottom">
              <div className="d-flex align-items-center">
                <i className="bi bi-star-fill text-warning me-2"></i>
                <h5 className="m-0 py-2">Sản phẩm nổi bật</h5>
              </div>
            </Card.Header>
            <Card.Body>
              <FeaturedProducts groupName="homepage" showTitle={false} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Role Testing Section - chỉ hiển thị khi đã đăng nhập */}
      {/* {isAuthenticated && (
        <Row>
          <Col xs={12}>
            <Card className="shadow-sm border-info">
              <Card.Header className="bg-info text-white">
                <div className="d-flex align-items-center">
                  <i className="bi bi-gear-fill me-2"></i>
                  <h6 className="m-0">Role-Based Navigation Demo</h6>
                </div>
              </Card.Header>
              <Card.Body>
                <Alert variant="info" className="mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  Tính năng này cho phép điều hướng người dùng dựa trên quyền
                  (role):
                  <ul className="mt-2 mb-0">
                    <li>
                      <strong>Admin/Staff:</strong> Sẽ được chuyển đến trang
                      quản trị (/admin)
                    </li>
                    <li>
                      <strong>Customer:</strong> Sẽ ở lại trang chủ (/)
                    </li>
                  </ul>
                </Alert>
                <div className="d-flex gap-2 flex-wrap">
                  <Button
                    variant="primary"
                    as={Link}
                    to="/role-test"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-eye me-2"></i>
                    Xem thông tin quyền
                  </Button>
                  <Button
                    variant="success"
                    as={Link}
                    to="/check-role"
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>
                    Test Role Redirect
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )} */}
    </Container>
  );
};

export default HomePage;
