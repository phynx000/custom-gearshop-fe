import React, { useState } from "react";
import {
  Card,
  Badge,
  Button,
  Alert,
  Row,
  Col,
  Modal,
  Table,
} from "react-bootstrap";
import { getOrderDetails } from "../../../api/userService";

const UserOrderHistory = ({ orders, loading, error, onRefresh }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { variant: "warning", label: "Chờ xử lý" },
      CONFIRMED: { variant: "info", label: "Đã xác nhận" },
      PROCESSING: { variant: "primary", label: "Đang xử lý" },
      SHIPPED: { variant: "secondary", label: "Đang giao" },
      DELIVERED: { variant: "success", label: "Đã giao" },
      CANCELLED: { variant: "danger", label: "Đã hủy" },
      REFUNDED: { variant: "dark", label: "Đã hoàn tiền" },
    };

    const config = statusConfig[status] || { variant: "light", label: status };
    return <Badge bg={config.variant}>{config.label}</Badge>;
  };

  const getPaymentMethodBadge = (method) => {
    const methods = {
      COD: {
        variant: "warning",
        label: "Thanh toán khi nhận hàng",
        icon: "bi-cash",
      },
      VNPAY: { variant: "primary", label: "VNPay", icon: "bi-credit-card" },
      CARD: {
        variant: "info",
        label: "Thẻ tín dụng",
        icon: "bi-credit-card-2-front",
      },
    };

    const config = methods[method] || {
      variant: "light",
      label: method,
      icon: "bi-question",
    };
    return (
      <Badge bg={config.variant} className="d-inline-flex align-items-center">
        <i className={`${config.icon} me-1`}></i>
        {config.label}
      </Badge>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      setOrderDetailsLoading(true);
      const orderDetails = await getOrderDetails(orderId);
      setSelectedOrder(orderDetails);
      setShowOrderModal(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      alert("Không thể tải chi tiết đơn hàng. Vui lòng thử lại.");
    } finally {
      setOrderDetailsLoading(false);
    }
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Card>
        <Card.Body>
          <div className="text-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
            <p className="mt-3">Đang tải lịch sử đơn hàng...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <Alert variant="danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
            <div className="mt-2">
              <Button variant="outline-danger" size="sm" onClick={onRefresh}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Thử lại
              </Button>
            </div>
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="bi bi-bag-check me-2"></i>
            Lịch sử đơn hàng
          </h5>
          <Button variant="outline-success" size="sm" onClick={onRefresh}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Làm mới
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          {orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-bag-x fs-1 text-muted"></i>
              <p className="mt-3 text-muted">Bạn chưa có đơn hàng nào.</p>
              <Button variant="success" href="/">
                <i className="bi bi-shop me-2"></i>
                Bắt đầu mua sắm
              </Button>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item border-bottom p-3">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <div className="d-flex align-items-center mb-2">
                        <h6 className="mb-0 me-3">Đơn hàng #{order.id}</h6>
                        {getStatusBadge(order.status)}
                        <span className="ms-3 text-muted small">
                          {formatDate(order.created_at)}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mb-2">
                        {getPaymentMethodBadge(order.payment_method)}
                        <span className="ms-3 text-muted small">
                          {order.total_quantity || 0} sản phẩm
                        </span>
                      </div>

                      {order.shipping_address && (
                        <p className="mb-0 text-muted small">
                          <i className="bi bi-geo-alt me-1"></i>
                          {order.shipping_address}
                        </p>
                      )}
                    </Col>

                    <Col md={4} className="text-md-end">
                      <div className="mb-2">
                        <span className="fw-bold text-success fs-5">
                          {formatPrice(order.total_price)}
                        </span>
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewOrderDetails(order.id)}
                        disabled={orderDetailsLoading}
                      >
                        {orderDetailsLoading ? (
                          <span
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          <i className="bi bi-eye me-1"></i>
                        )}
                        Xem chi tiết
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Order Details Modal */}
      <Modal show={showOrderModal} onHide={closeOrderModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-receipt me-2"></i>
            Chi tiết đơn hàng #{selectedOrder?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              {/* Order Info */}
              <Row className="mb-4">
                <Col md={6}>
                  <h6>Thông tin đơn hàng</h6>
                  <p className="mb-1">
                    <strong>Trạng thái:</strong>{" "}
                    {getStatusBadge(selectedOrder.status)}
                  </p>
                  <p className="mb-1">
                    <strong>Ngày đặt:</strong>{" "}
                    {formatDate(selectedOrder.created_at)}
                  </p>
                  <p className="mb-1">
                    <strong>Phương thức thanh toán:</strong>{" "}
                    {getPaymentMethodBadge(selectedOrder.payment_method)}
                  </p>
                </Col>
                <Col md={6}>
                  <h6>Thông tin giao hàng</h6>
                  <p className="mb-1">
                    <strong>Người nhận:</strong>{" "}
                    {selectedOrder.shipping_name || "Chưa cập nhật"}
                  </p>
                  <p className="mb-1">
                    <strong>Số điện thoại:</strong>{" "}
                    {selectedOrder.phone || "Chưa cập nhật"}
                  </p>
                  <p className="mb-1">
                    <strong>Địa chỉ:</strong>{" "}
                    {selectedOrder.shipping_address || "Chưa cập nhật"}
                  </p>
                </Col>
              </Row>

              {/* Order Items */}
              <h6>Sản phẩm đã đặt</h6>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          {item.product?.images?.[0] && (
                            <img
                              src={item.product.images[0].image}
                              alt={item.product?.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              className="me-2 rounded"
                            />
                          )}
                          <div>
                            <p className="mb-0">
                              {item.product?.name || "Sản phẩm không tồn tại"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td>{formatPrice(item.price)}</td>
                      <td>{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={3} className="text-end">
                      Tổng cộng:
                    </th>
                    <th className="text-success">
                      {formatPrice(selectedOrder.total_price)}
                    </th>
                  </tr>
                </tfoot>
              </Table>

              {selectedOrder.note && (
                <div className="mt-3">
                  <h6>Ghi chú</h6>
                  <p className="text-muted">{selectedOrder.note}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeOrderModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserOrderHistory;
