import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import styles from "./OrderSuccessPage.module.scss";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;
  const totalAmount = location.state?.totalAmount;
  console.log("Order Success State: ", location.state);
  const navigate = useNavigate();
  // Log order success info for debugging
  useEffect(() => {
    console.log("Order Success State: ", location.state);
    // Cart should already be cleared by checkout flow or VnpayReturnPage
    // No need to clear again here to avoid conflicts
  }, [location.state]);

  return (
    <Container
      className={`d-flex align-items-center justify-content-center ${styles["min-vh-80"]}`}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card
            className={`text-center shadow-lg p-4 border-0 ${styles["success-card"]}`}
          >
            {" "}
            <Card.Body>
              <BsCheckCircleFill
                size={72}
                className={`text-success mb-3 ${styles["success-icon"]}`}
              />
              <Card.Title as="h2" className="mb-3">
                {paymentMethod === "COD"
                  ? "Đặt hàng thành công!"
                  : "Thanh toán thành công!"}
              </Card.Title>
              <Card.Text className="mb-3">
                Cảm ơn bạn đã mua hàng tại Gear Shop.
                <br />
                <strong>Mã đơn hàng:</strong>{" "}
                <span className="text-primary">{orderId}</span>
              </Card.Text>

              {paymentMethod === "COD" && (
                <div
                  className={`alert alert-info mb-3 ${styles["order-info"]}`}
                >
                  <h6 className="mb-2">📦 Thông tin giao hàng</h6>
                  <p className="mb-1">• Đơn hàng sẽ được xử lý trong 24 giờ</p>
                  <p className="mb-1">• Bạn sẽ thanh toán khi nhận hàng</p>
                  <p className="mb-0">
                    • Chúng tôi sẽ liên hệ xác nhận đơn hàng
                  </p>
                </div>
              )}

              {totalAmount && (
                <Card.Text className="mb-3">
                  <strong>Tổng tiền:</strong>{" "}
                  <span className="text-success fw-bold">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount)}
                  </span>
                </Card.Text>
              )}

              <div
                className={`d-flex justify-content-center ${styles["action-buttons"]}`}
              >
                <Button
                  variant="success"
                  className="px-4"
                  onClick={() => navigate("/")}
                >
                  🏠 Về trang chủ
                </Button>
                <Button
                  variant="outline-primary"
                  className="px-4"
                  onClick={() => navigate("/profile")}
                >
                  📋 Xem đơn hàng
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccessPage;
