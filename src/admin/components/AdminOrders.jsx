import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import { getOrders } from "../../api/orderService";
import OrderStatusEditor from "./OrderStatusEditor";
import "./AdminOrders.scss";

const AdminOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [showStatusEditor, setShowStatusEditor] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu đơn hàng");
      console.error("Error loading orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Status mappings from backend to Vietnamese
  const statusLabels = {
    Pending: "Chờ xác nhận",
    Confirmed: "Đã xác nhận",
    Processing: "Đang xử lý",
    Delivering: "Đang giao hàng",
    Delivered: "Đã giao hàng",
    Completed: "Hoàn tất",
    Cancelled: "Đã hủy",
    Refunded: "Đã hoàn tiền",
  };

  const paymentStatusLabels = {
    Unpaid: "Chưa thanh toán",
    PendingCOD: "Chờ thanh toán (COD)",
    Paid: "Đã thanh toán",
    Failed: "Thanh toán thất bại",
    Refunded: "Đã hoàn tiền",
  };

  const statusOptions = [
    "Tất cả",
    "Pending",
    "Confirmed",
    "Processing",
    "Delivering",
    "Delivered",
    "Completed",
    "Cancelled",
    "Refunded",
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { variant: "warning", label: statusLabels["Pending"] },
      Confirmed: { variant: "info", label: statusLabels["Confirmed"] },
      Processing: { variant: "primary", label: statusLabels["Processing"] },
      Delivering: { variant: "info", label: statusLabels["Delivering"] },
      Delivered: { variant: "success", label: statusLabels["Delivered"] },
      Completed: { variant: "success", label: statusLabels["Completed"] },
      Cancelled: { variant: "danger", label: statusLabels["Cancelled"] },
      Refunded: { variant: "secondary", label: statusLabels["Refunded"] },
    };
    const config = statusConfig[status] || {
      variant: "secondary",
      label: status,
    };
    return <Badge bg={config.variant}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      Unpaid: { variant: "warning", label: paymentStatusLabels["Unpaid"] },
      PendingCOD: {
        variant: "warning",
        label: paymentStatusLabels["PendingCOD"],
      },
      Paid: { variant: "success", label: paymentStatusLabels["Paid"] },
      Failed: { variant: "danger", label: paymentStatusLabels["Failed"] },
      Refunded: { variant: "info", label: paymentStatusLabels["Refunded"] },
    };
    const config = statusConfig[status] || {
      variant: "secondary",
      label: status,
    };
    return <Badge bg={config.variant}>{config.label}</Badge>;
  };
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "Tất cả" ||
      order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleEditStatus = (order) => {
    setSelectedOrder(order);
    setShowStatusEditor(true);
  };

  const handleStatusUpdate = (updatedOrder) => {
    // Update the order in the list
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };
  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      processing: orders.filter((o) => o.status === "Processing").length,
      completed: orders.filter((o) => o.status === "Completed").length,
      cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };
  };

  const stats = getOrderStats();
  return (
    <div className="admin-orders">
      <Container fluid>
        {/* Error Alert */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h2 className="page-title">
                <i className="bi bi-cart-check me-3"></i>
                Quản lý Đơn hàng
              </h2>
              <p className="page-subtitle">
                Quản lý tất cả đơn hàng trong hệ thống
              </p>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "400px" }}
          >
            <Spinner animation="border" variant="primary" />
            <div className="ms-3">Đang tải danh sách đơn hàng...</div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <Row className="mb-4">
              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-primary">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-cart-check"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{stats.total}</h3>
                        <p>Tổng đơn hàng</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-warning">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-clock"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{stats.pending}</h3>
                        <p>Chờ xử lý</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-info">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-gear"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{stats.processing}</h3>
                        <p>Đang xử lý</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-success">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-check-circle"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{stats.completed}</h3>
                        <p>Hoàn thành</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-danger">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-x-circle"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{stats.cancelled}</h3>
                        <p>Đã hủy</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={2} md={4} sm={6} className="mb-3">
                <Card className="stats-card stats-info">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="stats-info">
                        <h3>2.4B</h3>
                        <p>Doanh thu</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Filters and Controls */}
            <Row className="mb-4">
              <Col>
                <Card className="filters-card">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col lg={4} md={6} className="mb-3 mb-lg-0">
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-search"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Tìm kiếm theo mã đơn, tên khách hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </InputGroup>
                      </Col>

                      <Col lg={3} md={6} className="mb-3 mb-lg-0">
                        {" "}
                        <Form.Select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status === "Tất cả"
                                ? status
                                : statusLabels[status] || status}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>

                      <Col lg={5} className="text-lg-end">
                        <Button variant="success" className="me-2">
                          <i className="bi bi-download me-2"></i>
                          Xuất báo cáo
                        </Button>
                        <Button variant="outline-secondary">
                          <i className="bi bi-arrow-clockwise me-2"></i>
                          Làm mới
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Orders Table */}
            <Row>
              <Col>
                <Card className="orders-table-card">
                  <Card.Header>
                    <h5 className="card-title mb-0">
                      <i className="bi bi-list-ul me-2"></i>
                      Danh sách đơn hàng ({filteredOrders.length})
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <Table responsive hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>Khách hàng</th>
                          <th>Sản phẩm</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                          <th>Thanh toán</th>
                          <th>Ngày đặt</th>
                          <th>Thao tác</th>
                        </tr>
                      </thead>{" "}
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <strong className="text-primary">
                                #{order.id}
                              </strong>
                            </td>
                            <td>
                              <div className="customer-info">
                                <div className="customer-name">
                                  {order.user_name}
                                </div>
                                <small className="text-muted">
                                  {order.shipping_address}
                                </small>
                              </div>
                            </td>
                            <td>
                              <div className="products-summary">
                                <span>Chi tiết sản phẩm</span>
                                <small className="text-muted d-block">
                                  Xem chi tiết để biết thêm
                                </small>
                              </div>
                            </td>
                            <td>
                              <strong className="text-success">
                                {formatPrice(parseFloat(order.total_price))}
                              </strong>
                            </td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>
                              <div className="payment-info">
                                {getPaymentStatusBadge(order.payment_status)}
                                <small className="d-block text-muted mt-1">
                                  {order.payment_method}
                                </small>
                              </div>
                            </td>
                            <td>
                              <div className="order-date">
                                {new Date(order.created_at).toLocaleDateString(
                                  "vi-VN"
                                )}
                                <small className="d-block text-muted">
                                  {new Date(
                                    order.created_at
                                  ).toLocaleTimeString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </small>
                              </div>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  className="me-1"
                                  title="Xem chi tiết"
                                  onClick={() => handleViewOrder(order)}
                                >
                                  <i className="bi bi-eye"></i>
                                </Button>{" "}
                                <Button
                                  variant="outline-success"
                                  size="sm"
                                  className="me-1"
                                  title="Cập nhật trạng thái"
                                  onClick={() => handleEditStatus(order)}
                                >
                                  <i className="bi bi-pencil"></i>
                                </Button>
                                <Button
                                  variant="outline-info"
                                  size="sm"
                                  className="me-1"
                                  title="In hóa đơn"
                                >
                                  <i className="bi bi-printer"></i>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Hiển thị {filteredOrders.length} đơn hàng
                    </small>
                    <Pagination className="mb-0">
                      <Pagination.Prev />
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item>{2}</Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Next />
                    </Pagination>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>{" "}
            {/* Order Details Modal */}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <i className="bi bi-receipt me-2"></i>
                  Chi tiết đơn hàng #{selectedOrder?.id}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedOrder && (
                  <div className="order-details">
                    <Row>
                      <Col md={6}>
                        <h6>Thông tin khách hàng</h6>
                        <p>
                          <strong>Tên:</strong> {selectedOrder.user_name}
                        </p>
                        <p>
                          <strong>Địa chỉ:</strong>{" "}
                          {selectedOrder.shipping_address}
                        </p>
                      </Col>
                      <Col md={6}>
                        <h6>Thông tin đơn hàng</h6>
                        <p>
                          <strong>Trạng thái:</strong>{" "}
                          {getStatusBadge(selectedOrder.status)}
                        </p>
                        <p>
                          <strong>Thanh toán:</strong>{" "}
                          {getPaymentStatusBadge(selectedOrder.payment_status)}
                        </p>
                        <p>
                          <strong>Phương thức:</strong>{" "}
                          {selectedOrder.payment_method}
                        </p>
                        <p>
                          <strong>Ngày đặt:</strong>{" "}
                          {new Date(
                            selectedOrder.created_at
                          ).toLocaleDateString("vi-VN")}
                        </p>
                        <p>
                          <strong>Tổng tiền:</strong>{" "}
                          {formatPrice(parseFloat(selectedOrder.total_price))}
                        </p>
                      </Col>
                    </Row>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Đóng
                </Button>
                <Button variant="primary">Cập nhật trạng thái</Button>{" "}
              </Modal.Footer>
            </Modal>
            {/* Order Status Editor Modal */}
            <Modal
              show={showStatusEditor}
              onHide={() => setShowStatusEditor(false)}
              size="md"
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <i className="bi bi-gear me-2"></i>
                  Cập nhật trạng thái đơn hàng
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedOrder && (
                  <OrderStatusEditor
                    order={selectedOrder}
                    onStatusUpdate={handleStatusUpdate}
                    isStaff={true}
                  />
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowStatusEditor(false)}
                >
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </div>
  );
};

export default AdminOrders;
