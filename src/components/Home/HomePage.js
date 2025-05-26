import React from "react";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import BannerCarousel from "../Banner/BannerCasourel";
import "bootstrap-icons/font/bootstrap-icons.css";
import SellingPoint from "../Banner/SellingPoint";
import ListFlashSale from "../Product/ListFlashSale";
import { getAllProducts } from "../../services/productService";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  const handleClick = () => {
    getAllProducts()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col lg={3} md={4} className="mb-4 mb-md-0">
          <Card className="h-100 shadow-sm">
            <Card.Body>
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
              <h5 className="m-0 py-2">Sản phẩm nổi bật</h5>
            </Card.Header>
            <Card.Body>
          <ListFlashSale />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
