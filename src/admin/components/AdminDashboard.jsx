import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  getDashboardOverview,
  getOrderStats,
  getLowStockProducts,
} from "../../api/dashboardService";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  // State for dashboard overview data
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for order statistics
  const [orderStats, setOrderStats] = useState(null);
  const [orderStatsLoading, setOrderStatsLoading] = useState(true);

  // State for low stock products
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [lowStockLoading, setLowStockLoading] = useState(true);
  // Load dashboard overview data on component mount
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        loadDashboardOverview(),
        loadOrderStats(),
        loadLowStockProducts(),
      ]);
    };
    loadData();
  }, []);
  const loadDashboardOverview = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDashboardOverview();

      // Handle possible legacy format where today_revenue is a number instead of an object
      if (data && typeof data.today_revenue === "number") {
        data.today_revenue = {
          paid: 0,
          pending_cod: 0,
          total: data.today_revenue,
        };
      }

      // Ensure all revenue values exist to prevent errors
      if (data && !data.revenue_by_payment_status) {
        data.revenue_by_payment_status = {
          Unpaid: 0,
          PendingCOD: 0,
          Paid: 0,
          Failed: 0,
          Refunded: 0,
        };
      }

      setOverviewData(data);
    } catch (err) {
      setError("Không thể tải dữ liệu tổng quan");
      console.error("Error loading dashboard overview:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadOrderStats = async () => {
    try {
      setOrderStatsLoading(true);
      const data = await getOrderStats();
      setOrderStats(data);
    } catch (err) {
      console.error("Error loading order statistics:", err);
    } finally {
      setOrderStatsLoading(false);
    }
  };

  const loadLowStockProducts = async () => {
    try {
      setLowStockLoading(true);
      const data = await getLowStockProducts();
      setLowStockProducts(data);
    } catch (err) {
      console.error("Error loading low stock products:", err);
    } finally {
      setLowStockLoading(false);
    }
  }; // Format currency for VND
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return "0₫";

    // Use compact format for large numbers
    if (amount >= 1000000000) {
      // > 1 billion
      return (amount / 1000000000).toFixed(1) + " tỷ ₫";
    } else if (amount >= 1000000) {
      // > 1 million
      return (amount / 1000000).toFixed(1) + " tr ₫";
    }

    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }; // The formatCurrencyShort function has been removed as it's no longer needed

  // Sample recent orders data
  const recentOrders = [
    {
      id: "#12345",
      customer: "Nguyễn Văn A",
      product: 'MacBook Pro 16"',
      status: "completed",
      amount: "45,000,000",
      date: "2024-06-08",
    },
    {
      id: "#12346",
      customer: "Trần Thị B",
      product: "iPhone 15 Pro",
      status: "processing",
      amount: "28,000,000",
      date: "2024-06-08",
    },
    {
      id: "#12347",
      customer: "Lê Văn C",
      product: "Dell XPS 13",
      status: "shipped",
      amount: "32,000,000",
      date: "2024-06-07",
    },
    {
      id: "#12348",
      customer: "Phạm Thị D",
      product: "iPad Pro",
      status: "pending",
      amount: "22,000,000",
      date: "2024-06-07",
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { variant: "success", label: "Hoàn thành" },
      processing: { variant: "primary", label: "Đang xử lý" },
      shipped: { variant: "info", label: "Đã giao" },
      pending: { variant: "warning", label: "Chờ xử lý" },
      cancelled: { variant: "danger", label: "Đã hủy" },
    };
    const config = statusConfig[status] || {
      variant: "secondary",
      label: status,
    };
    return <Badge bg={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="admin-dashboard">
      <Container fluid>
        {" "}
        {/* Dashboard Header */}
        <Row className="mb-4">
          <Col>
            <div className="dashboard-header">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="dashboard-title">
                    <i className="bi bi-speedometer2 me-3"></i>
                    Dashboard Tổng Quan
                  </h2>
                  <p className="dashboard-subtitle">
                    Chào mừng bạn đến với trang quản trị GearShop
                  </p>
                </div>
                <Button
                  variant="outline-light"
                  onClick={loadDashboardOverview}
                  disabled={loading}
                  className="refresh-btn"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <i className="bi bi-arrow-clockwise"></i>
                  )}
                  <span className="ms-2">Làm mới</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        {/* Stats Cards */}
        <Row className="mb-4">
          {/* Error Alert */}
          {error && (
            <Col xs={12} className="mb-3">
              <Alert variant="danger" dismissible onClose={() => setError("")}>
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
              </Alert>
            </Col>
          )}

          {/* Loading State */}
          {loading ? (
            <Col xs={12} className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <div className="mt-3">Đang tải dữ liệu tổng quan...</div>
            </Col>
          ) : (
            <>
              {/* Total Orders */}
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card stats-card-primary">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-cart-check"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{overviewData?.total_orders || 0}</h3>
                        <p>Tổng đơn hàng</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Today Orders */}
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card stats-card-info">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-calendar-day"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{overviewData?.today_orders || 0}</h3>
                        <p>Đơn hàng hôm nay</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>{" "}
              {/* Today Revenue */}
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card stats-card-success">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="stats-info">
                        {" "}
                        <h3
                          title={formatCurrency(
                            overviewData?.today_revenue?.total || 0
                          )}
                        >
                          {formatCurrency(
                            overviewData?.today_revenue?.total || 0
                          )}
                        </h3>
                        <p>Doanh thu hôm nay</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Total Users */}
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card stats-card-info">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{overviewData?.total_users || 0}</h3>
                        <p>Tổng người dùng</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Low Stock Items */}
              <Col lg={3} md={6} className="mb-3">
                <Card className="stats-card stats-card-warning">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-exclamation-triangle"></i>
                      </div>
                      <div className="stats-info">
                        <h3>{overviewData?.low_stock_items || 0}</h3>
                        <p>Sản phẩm tồn kho thấp</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>{" "}
        {/* Revenue Stats Row */}
        <Row className="mb-4">
          <Col>
            <h4 className="section-title mb-3">
              <i className="bi bi-graph-up me-2"></i>Thống kê doanh thu
            </h4>
          </Col>
        </Row>
        <Row className="mb-4">
          {loading ? (
            <Col xs={12} className="text-center py-3">
              <Spinner animation="border" variant="primary" />
              <div className="mt-2">Đang tải dữ liệu doanh thu...</div>
            </Col>
          ) : (
            <>
              {" "}
              {/* Total Revenue card has been removed */} {/* Weekly Revenue */}
              <Col lg={4} md={6} className="mb-3">
                <Card className="stats-card stats-card-info">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-calendar-week"></i>
                      </div>
                      <div className="stats-info">
                        {" "}
                        <h3
                          title={formatCurrency(
                            overviewData?.weekly_revenue || 0
                          )}
                        >
                          {formatCurrency(overviewData?.weekly_revenue || 0)}
                        </h3>
                        <p>Doanh thu tuần này</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Monthly Revenue */}
              <Col lg={4} md={6} className="mb-3">
                <Card className="stats-card stats-card-success">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-calendar-month"></i>
                      </div>
                      <div className="stats-info">
                        {" "}
                        <h3
                          title={formatCurrency(
                            overviewData?.monthly_revenue || 0
                          )}
                        >
                          {formatCurrency(overviewData?.monthly_revenue || 0)}
                        </h3>
                        <p>Doanh thu tháng này</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              {/* Paid Revenue */}
              <Col lg={4} md={6} className="mb-3">
                <Card className="stats-card stats-card-primary">
                  <Card.Body>
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="bi bi-check-circle"></i>
                      </div>
                      <div className="stats-info">
                        {" "}
                        <h3
                          title={formatCurrency(
                            overviewData?.revenue_by_payment_status?.Paid || 0
                          )}
                        >
                          {formatCurrency(
                            overviewData?.revenue_by_payment_status?.Paid || 0
                          )}
                        </h3>
                        <p>Doanh thu đã thanh toán</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
        {/* Payment Status Breakdown */}
        <Row className="mb-4">
          <Col>
            <Card className="payment-status-card">
              <Card.Header>
                <h5 className="card-title">
                  <i className="bi bi-credit-card me-2"></i>
                  Thống kê theo trạng thái thanh toán
                </h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-3">
                    <Spinner animation="border" variant="primary" size="sm" />
                    <div className="mt-2 small">Đang tải...</div>
                  </div>
                ) : (
                  <div className="payment-status-container">
                    <Row>
                      {" "}
                      <Col md={6} lg={4} className="mb-3">
                        <div className="payment-status-item paid">
                          <div className="payment-status-icon">
                            <i className="bi bi-check-circle-fill"></i>
                          </div>
                          <div className="payment-status-info">
                            <h6>Đã thanh toán</h6>
                            <h4
                              title={formatCurrency(
                                overviewData?.revenue_by_payment_status?.Paid ||
                                  0
                              )}
                            >
                              {formatCurrency(
                                overviewData?.revenue_by_payment_status?.Paid ||
                                  0
                              )}
                            </h4>
                          </div>
                        </div>
                      </Col>{" "}
                      <Col md={6} lg={4} className="mb-3">
                        <div className="payment-status-item pending">
                          <div className="payment-status-icon">
                            <i className="bi bi-hourglass-split"></i>
                          </div>
                          <div className="payment-status-info">
                            <h6>Chờ thanh toán COD</h6>
                            <h4
                              title={formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.PendingCOD || 0
                              )}
                            >
                              {formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.PendingCOD || 0
                              )}
                            </h4>
                          </div>
                        </div>
                      </Col>{" "}
                      <Col md={6} lg={4} className="mb-3">
                        <div className="payment-status-item unpaid">
                          <div className="payment-status-icon">
                            <i className="bi bi-x-circle-fill"></i>
                          </div>
                          <div className="payment-status-info">
                            <h6>Chưa thanh toán</h6>
                            <h4
                              title={formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Unpaid || 0
                              )}
                            >
                              {formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Unpaid || 0
                              )}
                            </h4>
                          </div>
                        </div>
                      </Col>{" "}
                      <Col md={6} lg={4} className="mb-3">
                        <div className="payment-status-item failed">
                          <div className="payment-status-icon">
                            <i className="bi bi-exclamation-circle-fill"></i>
                          </div>
                          <div className="payment-status-info">
                            <h6>Thanh toán thất bại</h6>
                            <h4
                              title={formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Failed || 0
                              )}
                            >
                              {formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Failed || 0
                              )}
                            </h4>
                          </div>
                        </div>
                      </Col>{" "}
                      <Col md={6} lg={4} className="mb-3">
                        <div className="payment-status-item refunded">
                          <div className="payment-status-icon">
                            <i className="bi bi-arrow-counterclockwise"></i>
                          </div>
                          <div className="payment-status-info">
                            <h6>Đã hoàn tiền</h6>
                            <h4
                              title={formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Refunded || 0
                              )}
                            >
                              {formatCurrency(
                                overviewData?.revenue_by_payment_status
                                  ?.Refunded || 0
                              )}
                            </h4>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* Order Statistics Table */}
          <Col lg={8} className="mb-4">
            <Card className="stats-table-card">
              <Card.Header>
                <h5 className="card-title">
                  <i className="bi bi-table me-2"></i>
                  Đơn hàng 7 ngày gần nhất
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {orderStatsLoading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <div className="mt-3">Đang tải thống kê đơn hàng...</div>
                  </div>
                ) : orderStats ? (
                  <div className="table-responsive">
                    <Table hover className="mb-0 stats-table">
                      {" "}
                      <thead className="table-dark">
                        <tr>
                          <th className="text-center">Ngày</th>
                          <th className="text-center">Số đơn hàng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {" "}
                        {orderStats.labels.map((date, index) => {
                          const orderCount = orderStats.order_counts[index];
                          const revenue = orderStats.revenue[index];

                          return (
                            <tr key={index} className="stats-row">
                              <td className="text-center fw-bold">
                                <i className="bi bi-calendar-day me-2 text-primary"></i>
                                {date}
                              </td>
                              <td className="text-center">
                                <Badge bg="primary" className="fs-6 px-3 py-2">
                                  {orderCount} đơn
                                </Badge>
                              </td>
                              {/* <td className="text-center">
                                <span className="revenue-amount fw-bold text-success">
                                  {formatCurrency(revenue)}
                                </span>
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="table-light">
                        {" "}
                        <tr className="fw-bold">
                          <td className="text-center text-primary">
                            <i className="bi bi-calculator me-2"></i>
                            Tổng cộng
                          </td>
                          <td className="text-center">
                            <Badge bg="success" className="fs-6 px-3 py-2">
                              {orderStats.order_counts.reduce(
                                (a, b) => a + b,
                                0
                              )}{" "}
                              đơn
                            </Badge>
                          </td>
                          {/* <td className="text-center">
                            <span className="total-revenue fw-bold text-success fs-5">
                              {formatCurrency(
                                orderStats.revenue.reduce((a, b) => a + b, 0)
                              )}
                            </span>
                          </td> */}
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-exclamation-circle fs-1"></i>
                    <div className="mt-3">Không thể tải dữ liệu thống kê</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* Low Stock Products */}
          <Col lg={4} className="mb-4">
            <Card className="low-stock-card">
              <Card.Header>
                <h5 className="card-title">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Cảnh báo tồn kho thấp
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {lowStockLoading ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="warning" size="sm" />
                    <div className="mt-2 small">Đang tải...</div>
                  </div>
                ) : lowStockProducts.length > 0 ? (
                  <div className="table-responsive">
                    <Table hover className="mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Sản phẩm</th>
                          <th>Chi nhánh</th>
                          <th>Màu sắc</th>
                          <th>Tồn kho</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowStockProducts.map((product, index) => (
                          <tr key={`${product.product_id}-${index}`}>
                            <td>
                              <div className="product-name-small">
                                {product.product_name}
                              </div>
                            </td>
                            <td>
                              <small className="text-muted">
                                {product.branch_name}
                              </small>
                            </td>
                            <td>
                              <Badge bg="info" className="badge-sm">
                                {product.color}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                bg={
                                  product.quantity <= 5 ? "danger" : "warning"
                                }
                                className="quantity-badge"
                              >
                                {product.quantity}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted">
                    <i className="bi bi-check-circle fs-4 text-success"></i>
                    <div className="mt-2">Không có sản phẩm tồn kho thấp</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
