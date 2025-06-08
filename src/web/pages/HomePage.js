import React from "react";
import CategorySideBar from "../components/CategorySideBar/CategorySideBar";
import BannerCarousel from "../components/Banner/BannerCasourel";
import "bootstrap-icons/font/bootstrap-icons.css";
import SellingPoint from "../components/Banner/SellingPoint";
import FeaturedProducts from "../components/Product/FeaturedProducts";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./HomePage.scss"; // Add this for additional styling

const HomePage = () => {
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

      <Row>
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
    </Container>
  );
};

export default HomePage;
