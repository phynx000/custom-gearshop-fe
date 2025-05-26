import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import styles from "./OrderSuccessPage.module.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderSuccessPage = () => {
  //   const query = useQuery();
  //   const orderId = query.get("orderId");
  const location = useLocation();
  const orderId = location.state?.orderId;
  //   console.log("order id: ", orderId);
  const navigate = useNavigate();

  return (
    <Container
      className={`d-flex align-items-center justify-content-center ${styles["min-vh-80"]}`}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center shadow p-4 border-0">
            <Card.Body>
              <BsCheckCircleFill size={72} className="text-success mb-3" />
              <Card.Title as="h2" className="mb-3">
                Thanh toán thành công!
              </Card.Title>
              <Card.Text className="mb-2">
                Cảm ơn bạn đã mua hàng tại Gear Shop.
                <br />
                <strong>Mã đơn hàng:</strong>{" "}
                <span className="text-primary">{orderId}</span>
              </Card.Text>
              <Button
                variant="success"
                className="mt-3 px-4"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccessPage;
