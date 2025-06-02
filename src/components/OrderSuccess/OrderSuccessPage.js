import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { clearCartAfterPayment } from "../../services/cartService";
import styles from "./OrderSuccessPage.module.scss";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  console.log("orderId: ", location.state);
  const navigate = useNavigate();

  // Clear cart when reaching success page (if not already cleared)
  useEffect(() => {
    const clearCart = async () => {
      try {
        await clearCartAfterPayment();
        console.log("Cart cleared after successful order");
      } catch (error) {
        console.error("Error clearing cart on success page:", error);
      }
    };

    clearCart();
  }, []);

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
                {/* <strong>Mã giao dịch:</strong>{" "}
                <span className="text-primary">TRANSACTION_ID</span> */}
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
